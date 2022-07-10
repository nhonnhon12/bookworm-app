<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Discount;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function __invoke(Request $request)
    {
        $price = Discount::query()
            ->where('discount_start_date', '<=', date('Y-m-d'))
            ->where(function ($query){
                $query->whereNull('discount_end_date')
                    ->orWhere('discount_end_date', '>=', date('Y-m-d'));
            })
            ->groupBy('book_id')
            ->selectRaw('book_id, min(discount_price) as p');
        $book = Book::query()->leftJoinSub($price, 'd', 'book.id', 'd.book_id')->select('book.id')->selectRaw('coalesce(d.p, book_price) as price')->get();
        return $book;
    }
}
