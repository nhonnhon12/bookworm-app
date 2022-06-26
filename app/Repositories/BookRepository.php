<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\Discount;
use App\Models\Review;
use Illuminate\Support\Facades\DB;

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
        if($conditions->has('author')){
            //dd($conditions->get('author'));
            $authorId = Author::whereRaw("author_name like '%". $conditions->get('author') ."%'")
                ->select('id')
                ->get();
            $this->query->whereIn('author_id', $authorId);
        }
        if($conditions->has('category')){
            $this->query->where('category_id', $conditions->get('category'));
        }
        if($conditions->has('star')){
            if($conditions->get('star') > 0) {
                $booksBelow = Review::groupBy('book_id')
                    ->havingRaw("avg(rating_start) >= " . $conditions->get('star'))
                    ->select('book_id');
                $this->query->whereIn('id', $booksBelow);
            }
        }
        if($conditions->has('sort')){
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
        if($conditions->has('limit')){
            $this->query->take($conditions->get('limit'));
        }
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
