<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class RecommendedController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $books = Book::rightJoin('review', 'book.id', '=', 'book_id')
            ->groupByRaw('book.id')
            ->orderByRaw('avg(review.rating_start) desc')
            ->selectRaw('book.id, avg(review.rating_start) a, book.book_price', 'book.author')
            ->limit(8)
            ->get();
        return response(BookResource::collection($books));
    }
}
