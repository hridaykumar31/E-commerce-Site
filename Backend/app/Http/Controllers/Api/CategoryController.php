<?php

namespace App\Http\Controllers\Api;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function index() {
    $category = Category::all();

    return response()->json([
      'category' => $category,
      'message' => 'All category fetched successfully',
     ], 200);
    }
   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string|max:1000',
            'img' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'thumbnail' => 'nullable|string|max:255'
        ]);
        if($request->hasFile('img')) {
            $imageName = time() . '_' . $request->file('img')->getClientOriginalName();
            $request->file('img')->storeAs('categories', $imageName, 'public');
            $validated['img'] = $imageName;
        }

        $category = Category::create($validated);

        return response()->json([
            'message' => 'Category added successfully',
            'category' => $category,
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Server error',
            'error' => $e->getMessage(),
        ], 500);
    }
}


}
