<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    const UPDATED_AT = 'review_date';
    public $timestamps = true;
    protected $table = 'order';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }
}
