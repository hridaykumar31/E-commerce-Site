<?php

namespace App\Http\Controllers\Api;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index() {
    $tags = Tag::with('products')->get();
    return response()->json([
      'tags' => $tags,
      'message' => 'All products fetched successfully',
     ], 200);
    }

    public function store(Request $request) {
        
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string|max:1000',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id'

        ]);
        $tag = Tag::create($validated);
    

        if(!empty($validated['product_ids'])) {
          
           $tag->products()->attach($validated['product_ids']);

        }
       
         return response()->json([
        'message' => 'Tag added successfully',
        'tag' => $tag,
    ], 201);

    }
    

}
