<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'order_item';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    public function order()
    {
        return $this->belongsTo(Order::class, 'id', 'order_id');
    }
    public function books()
    {
        return $this->belongsToMany(Book::class);
    }
}
