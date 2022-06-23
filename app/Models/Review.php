<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    const UPDATED_AT = 'review_date';
    public $timestamps = true;
    protected $table = 'review';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
