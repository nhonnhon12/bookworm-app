<?php

namespace App\Http\Resources;

use App\Models\Discount;
use App\Models\Review;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //get discount price
        $price = Discount::where('book_id', $this->id)
            ->where('discount_start_date', '<=', date('Y-m-d'))
            ->where(function ($query){
                $query->whereNull('discount_end_date')
                    ->orWhere('discount_end_date', '>=', date('Y-m-d'));
            })
            ->selectRaw('min(discount_price)')
            ->get();
        $price = $price->pluck("min")->first();

        //get rating star
        $rating = Review::groupBy('book_id')
            ->where('book_id', $this->id)
            ->selectRaw('avg(rating_start)')
            ->get();
        $rating = $rating->pluck("avg")->first();
        if($rating!=null) $rating=round($rating, 1);

        //get count review
        $counting = Review::groupBy('book_id')
            ->where('book_id', $this->id)
            ->selectRaw('count(rating_start)')
            ->get();
        $counting = $counting->pluck("count")->first();

        //return value
        return [
            'id' => $this->id,
            'author' => $this->author->author_name,
            'category' => $this->category->category_name,
            'title' => $this->book_title,
            'summary' => $this->book_summary,
            'photo' => $this->book_cover_photo,
            'price' => $price,
            'original_price' => $this->book_price,
            'rating' => $rating,
            'count' => $counting
        ];
    }
}
