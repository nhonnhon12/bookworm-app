<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $price = null;
        foreach ($this->discounts as $discount) {
            if(((date('d/m/Y')>=$discount->discount_start_date) && is_null($discount->discount_end_date ))
            || ((date('d/m/Y')>=$discount->discount_start_date) && (date('d/m/Y')<=$discount->discount_end_date))) {
                $price = $discount->discount_price;
            }
        }
        $sum = 0;
        $count = 0;
        foreach($this->reviews as $r){
            $sum += $r->rating_star;
            $count++;
        }
        if($count === 0){
            $avg = null;
        }
        else{
            $avg = floor($sum/$count);
        }
        return [
            'id' => $this->id,
            'author' => $this->author->author_name,
            'category' => $this->category->category_name,
            'title' => $this->book_title,
            'summary' => $this->book_summary,
            'photo' => $this->book_cover_photo,
            'price' => $price,
            'original_price' => $this->book_price,
            'rating' => $avg,
        ];
    }
}
