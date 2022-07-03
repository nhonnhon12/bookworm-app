<?php

namespace App\Repositories;

use App\Models\Review;

class ReviewRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = Review::query();
    }
    public function getById($id, $conditions)
    {
        return $this->query->find($id);
    }
    public function filter($conditions)
    {
        if($conditions->has('book_id'))
            $this->query = Review::forBook($conditions->get('book_id'));
        if($conditions->has('star'))
            $this->query->where('rating_start', $conditions->get('star'));
        if($conditions->has('sort'))
            $this->query->orderBy('review_date', $conditions->get('sort'));
        else $this->query->orderBy('review_date', 'asc');
        if($conditions->has('paginate'))
            $this->query->paginate($conditions->get('paginate'));
        return $this->query->get();
    }
    public function create($data)
    {
        $review = new Review();
        $review->book_id = $data->get('book_id');
        $review->review_title = $data->get('title');
        if($data->has('details')) $review->review_details = $data->get('details');
        $review->rating_start = $data->get('star');
        $review->save();
    }

    public function update($data)
    {
        // TODO: Implement update() method.
    }
}
