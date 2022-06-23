<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'discount';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    public function book()
    {
        return $this->belongsTo(Book::class, 'id', 'book_id');
    }
}
