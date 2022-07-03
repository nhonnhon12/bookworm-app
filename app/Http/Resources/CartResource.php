<?php

namespace App\Http\Resources;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $orderItems = [];
        $items = OrderItem::where('id', $this->id)->get();
        foreach ($items as $i){
            $orderItems[] = [
                'id' => $i->get('id'),
                'book_id' => $i->get('book_id'),
                'quantity' => $i->get('quantity'),
                'price' => $i->get('price'),
            ];
        }
        return [
            'id' => $this->id,
            'user' => $this->user_id,
            'order_amount' => $this->order_amount,
            'items' => $orderItems
        ];
    }
}
