<?php

namespace App\Http\Controllers\Api;
use App\Models\Product;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
  public function index() {
  $products = Product::with('tags')->get();
  return response()->json([
    'products' => $products,
    'message' => 'All products fetched successfully',
    ], 200);
  }

  public function store(Request $request){
    $path = null;
    try {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);

        if($request->hasFile('image')) {  
            $imageName = time() . '_' . $request->image->getClientOriginalName();
            $request->image->storeAs('products', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        $product = Product::create($validated);
        $product->tags()->attach($validated['tag_ids']);

        return response()->json([
            'message' => 'Product Created Successfully',
            'product' => $product->load('tags'),
            'path' => $path,
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Server Error',
            'message' => $e->getMessage()
        ], 500);
    }
}

  public function show($id) {

  //find single post based on the primary key id and run a query to fetch the single from database
    $single_product = Product::with('tags')->findorFail($id);

    return response()->json([
        'product' => $single_product,
        'message' => 'Product fetched successfully',
    ], 200);
  }

public function update(Request $request, $id){
    try {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'sku' => 'required|unique:products,sku,' . $id,
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);
        if($product->image) {
         Storage::disk('public')->delete('products/' . $product->image);
      }

        if($request->hasFile('image')) {
           
            $imageName = time() . '_' . $request->image->getClientOriginalName();
            $request->image->storeAs('products', $imageName, 'public');
            $validated['image'] = $imageName;
        }

        $product->update($validated);

        if(isset($validated['tag_ids'])) {
            $product->tags()->sync($validated['tag_ids']);
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->load('tags'),
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Update failed',
            'message' => $e->getMessage(),
        ], 500);
    }
}


public function destroy($id) {
$product = Product::findorFail($id);
 if($product->image) {
 Storage::disk('public')->delete('products/' . $product->image);
}
$product->tags()->detach();
$product->delete();

return response()->json([
  'message' => 'Product deleted successfully',
], 200);
}
}
