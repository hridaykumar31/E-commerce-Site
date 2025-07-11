<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Storage;


    Route::get('/test-image/{filename}', function ($filename) {
    $filename = trim($filename); 

    $productPath = storage_path('app/public/products/' . $filename);
    $categoryPath = storage_path('app/public/categories/' . $filename);

    if(file_exists($productPath)) {
        return response()->file($productPath);
    }

    if(file_exists($categoryPath)) {
        return response()->file($categoryPath);
    }

    return response()->json([
        'error' => 'File not found',
        'filename' => $filename,
        'product_path' => $productPath,
        'category_path' => $categoryPath,
    ], 404);
});



  
    //All Route for user auth Task-2
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    //Middleware for user
    Route::middleware(['auth:sanctum', 'ability:user'])->group(function () {
    Route::get('/user', [AuthController::class, 'authUser']);
    //Commenting the post 
    Route::post('/posts/comment/{id}', [CommentController::class, 'store']);

    //Like and dislike the post route handler
    Route::post('/posts/like/{id}', [LikeController::class, 'likePost']);
    Route::post('/posts/dislike/{id}', [LikeController::class, 'disLikePost']);


    //Like and dislike the comment route handler
    Route::post('/comments/like/{id}', [LikeController::class, 'LikeComment']);
    Route::post('/comments/dislike/{id}', [LikeController::class, 'disLikeComment']);

    //Add to cart route handler
    Route::post('/cart/add/{id}', [CartController::class, 'addToCart']);
    Route::get('/cart/getCartItems', [CartController::class, 'getCartItems']);

    //Add order route handler
    Route::post('/orders/place', [OrderController::class, 'placeOrder']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
   //Middleware for admin
    Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
     Route::get('/admin', [AuthController::class, 'authAdmin']);
 
    //All Blog post route or api for Task-1
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::patch('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    
    //All Rotes for Product Controller
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::patch('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    Route::post('/tags', [TagController::class, 'store']);
    Route::get('/tags', [TagController::class, 'index']);


    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::patch('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    


    });


    //All route for task management Task-3
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::patch('/tasks/{id}', [TaskController::class, 'update']);
    Route::get('/tasks/pending', [TaskController::class, 'pending']);


    Route::get('/hello', function () {
        return response()->json(['message' => "hello world"], 200);
    });
