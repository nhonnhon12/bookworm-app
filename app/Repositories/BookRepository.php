<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\Discount;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class BookRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }

    public function getById($id, $conditions)
    {
        return $this->query->find($id);
    }

    public function filter($conditions)
    {
        // author filter
        if($conditions->has('author')){
            //dd($conditions->get('author'));
            $this->query->where('author_id', $conditions->get('author'));
        }
        // category filter
        if($conditions->has('category')){
            $this->query->where('category_id', $conditions->get('category'));
        }
        //rating filter
        if($conditions->has('rating')){
            if($conditions->get('rating') > 0) {
                $booksBelow = Review::groupBy('book_id')
                    ->havingRaw("avg(rating_start) >= " . $conditions->get('rating'))
                    ->select('book_id');
                $this->query->whereIn('id', $booksBelow);
            }
        }
        //sort: get value of sort to sort
        if($conditions->has('sort')){
            //by sale
            if($conditions->get('sort')=='sale') {
                $price = Discount::query()
                    ->where('discount_start_date', '<=', date('Y-m-d'))
                    ->where(function ($query){
                        $query->whereNull('discount_end_date')
                            ->orWhere('discount_end_date', '>=', date('Y-m-d'));
                    })
                    ->groupBy('book_id')
                    ->selectRaw('book_id, min(discount_price) as p');
                $this->query
                    ->leftJoinSub($price, 'd', 'book.id', 'd.book_id')
                    ->orderByRaw('case when d.p is not null then (book_price - d.p) else 0 end desc, coalesce(d.p, book_price)');
            }
            //by popularity
            if($conditions->get('sort')=='popularity') {
                $review = Review::query()
                    ->groupBy('book_id')
                    ->selectRaw('book_id, count(rating_start) as c');
                $price = Discount::query()
                    ->where('discount_start_date', '<=', date('Y-m-d'))
                    ->where(function ($query){
                        $query->whereNull('discount_end_date')
                            ->orWhere('discount_end_date', '>=', date('Y-m-d'));
                    })
                    ->groupBy('book_id')
                    ->selectRaw('book_id, min(discount_price) as p');
                $this->query
                    ->leftJoinSub($review, 'c', 'book.id', 'book_id')
                    ->leftJoinSub($price, 'd', 'book.id', 'd.book_id')
                    ->orderByRaw('c desc nulls last, coalesce(d.p, book_price)');
            }
            //by recommended
            if($conditions->get('sort')=='recommended') {
                $review = Review::query()
                    ->groupBy('book_id')
                    ->selectRaw('book_id, avg(rating_start) as a');
                $price = Discount::query()
                    ->where('discount_start_date', '<=', date('Y-m-d'))
                    ->where(function ($query){
                        $query->whereNull('discount_end_date')
                            ->orWhere('discount_end_date', '>=', date('Y-m-d'));
                    })
                    ->groupBy('book_id')
                    ->selectRaw('book_id, min(discount_price) as p');
                $this->query
                    ->leftJoinSub($review, 'c', 'book.id', 'book_id')
                    ->leftJoinSub($price, 'd', 'book.id', 'd.book_id')
                    ->orderByRaw('a desc nulls last, coalesce(d.p, book_price)');
            }
            //by price asc
            if($conditions->get('sort')=='price-asc') {
                $price = Discount::query()
                    ->where('discount_start_date', '<=', date('Y-m-d'))
                    ->where(function ($query){
                        $query->whereNull('discount_end_date')
                            ->orWhere('discount_end_date', '>=', date('Y-m-d'));
                    })
                    ->groupBy('book_id')
                    ->selectRaw('book_id, min(discount_price) as p');
                $this->query
                    ->leftJoinSub($price, 'd', 'book.id', 'd.book_id')
                    ->orderByRaw('coalesce(d.p, book_price) asc');
            }
            //by price desc
            if($conditions->get('sort')=='price-desc') {
                $price = Discount::query()
                    ->where('discount_start_date', '<=', date('Y-m-d'))
                    ->where(function ($query){
                        $query->whereNull('discount_end_date')
                            ->orWhere('discount_end_date', '>=', date('Y-m-d'));
                    })
                    ->groupBy('book_id')
                    ->selectRaw('book_id, min(discount_price) as p');
                $this->query
                    ->leftJoinSub($price, 'd', 'book.id', 'd.book_id')
                    ->orderByRaw('coalesce(d.p, book_price) desc');
            }
        }
        //limit number of book to get
        if($conditions->has('limit')){
            $this->query->limit($conditions->get('limit'));
        }
        //paginate
        if($conditions->has('paginate')){
            return $this->query->paginate($conditions->get('paginate'));
        }
        else return $this->query->get();
        //http://127.0.0.1:8000/api/books?author=La&category=4&sort=book_price&order=desc
    }

    public function create($data)
    {
        // TODO: Implement create() method.
    }

    public function update($data)
    {
        // TODO: Implement update() method.
    }
}
