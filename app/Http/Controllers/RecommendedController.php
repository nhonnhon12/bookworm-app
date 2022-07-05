<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Repositories\BookRepository;
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
        $r= collect(['limit' => '8', 'sort' => 'recommended']);
        $_bookRepository = new BookRepository();
        return response(BookResource::collection($_bookRepository->filter($r)));
    }
}
