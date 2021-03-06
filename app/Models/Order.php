<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    const UPDATED_AT = 'order_date';
    const CREATED_AT = 'order_date';
    public $timestamps = true;
    protected $table = 'order';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    protected $fillable = [
        'user_id',
        'order_amount'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
