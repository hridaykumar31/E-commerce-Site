<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description', 'img', 'thumbnail'];
    
    public function products() {
        return $this->hasMany(Product::class);
    }
    public function posts() {
        return $this->hasMany(Post::class);
    }
    
}
