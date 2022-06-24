<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\Review;

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
        if($conditions->has('star-bellow')){
            $booksBelow = Review::groupBy('book_id')
                ->havingRaw("avg(rating_start) >= ".$conditions->get('star-bellow'))
                ->select('book_id');
            $this->query->whereIn('id', $booksBelow);
        }
        if($conditions->has('sort')){
            $this->query->orderBy($conditions->get('sort'), $conditions->get('order'));
        }
        return $this->query->get();
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
