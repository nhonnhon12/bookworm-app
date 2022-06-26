<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class OnSaleController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
//        $books = Book::rightJoin('discount', 'book.id', '=', 'book_id')
//            ->whereRaw('discount_price IS NOT NULL')
//            ->orderByRaw('(book_price - discount.discount_price)')
//            ->limit(10)
//            ->get();
//        return response(BookResource::collection($books));
        $r= collect(['limit' => '10', 'sort' => 'sale']);
        $_bookRepository = new BookRepository();
        return response(BookResource::collection($_bookRepository->filter($r)));
    }
}
