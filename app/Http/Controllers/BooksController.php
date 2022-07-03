<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Repositories\BookRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BooksController extends Controller
{
    private BookRepository $_bookRepository;
    public function __construct()
    {
        $this->_bookRepository = new BookRepository();
    }
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validator = $request->validate([
            'author' => 'max:50|alpha',
            'category' => 'integer',
            'star' => 'digits_between:0,5',
            'sort' => Rule::in(['sale', 'popularity', 'recommended', 'price-asc', 'price-desc']),
            'limit' => Rule::in(['8', '10']),
            'paginate' => Rule::in(['5', '15', '20', '25'])
        ]);
        return response(BookResource::collection($this->_bookRepository->filter($request)));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //un-use
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $books = $this->_bookRepository->getById($id, []);
        return response(new BookResource($books));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //un-use
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //un-use
    }
}
