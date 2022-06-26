<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class PopularController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $r= collect(['limit' => '8', 'sort' => 'popularity']);
        $_bookRepository = new BookRepository();
        return response(BookResource::collection($_bookRepository->filter($r)));
    }
}
