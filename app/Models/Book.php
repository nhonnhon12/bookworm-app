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
        return $this->hasMany(Review::class);
    }
    public function discounts()
    {
        return $this->hasMany(Discount::class);
    }
    public function orderitems()
    {
        return $this->belongsToMany(OrderItem::class);
    }
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
