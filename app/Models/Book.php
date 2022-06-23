<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    //Relationships
    public function reviews()
    {
        return $this->hasMany(Review::class, 'book_id', 'id');
    }
    public function discounts()
    {
        return $this->hasMany(Discount::class, 'book_id', 'id');
    }
    public function orderitems()
    {
        return $this->belongsToMany(OrderItem::class);
    }
    public function author()
    {
        return $this->belongsTo(Author::class, 'id', 'author_id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'id', 'category_id');
    }
}
