<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    const UPDATED_AT = 'review_date';
    const CREATED_AT = 'review_date';
    public $timestamps = true;
    protected $table = 'review';
    protected $primaryKey = 'id';
    public  $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'book_id',
        'title',
        'details',
        'star',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
    public function scopeForBook($query, $id)
    {
        return $query->where('book_id', $id);
    }
}
