<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviews;
use App\Http\Resources\ReviewResource;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReviewsController extends Controller
{
    private ReviewRepository $_reviewRepository;
    public function __construct(){
        $this->_reviewRepository=new ReviewRepository();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validator = $request->validate([
            'star' => 'integer|digits_between:1,5',
            'sort' => Rule::in(['desc', 'asc']),
            'paginate' => Rule::in(['5', '15', '20', '25']),
        ]);
        return response(ReviewResource::collection($this->_reviewRepository->filter($request)));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReviews $request)
    {
        $this->_reviewRepository->create($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $review = $this->_reviewRepository->getById($id, []);
        return response(new ReviewResource($review));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
