<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
//            'book_id' => $this->book_id,
//            'book_title' =>$this->book->book_title,
            'review_id' => $this->id,
            'review_title' => $this->review_title,
            'details' => $this->review_details,
            'rating' => $this->rating_start,
            'date' => $this->review_date,
        ];
    }
}
