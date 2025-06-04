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
    public function store(Request $request) {

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string|max:1000'
        ]);

       $category = Category::create([
            'name' => $request->input('name'),
            'description' => $request->input('description', null),
       ]);

        return response()->json([
            'message' => 'Category added successfully',
            'category' => $category,
        ], 201);
    }

}
