<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Discount;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $idString = $request->get('id');
        $numString = $request->get('num');

        //check valid book
        $listId = explode(',', $idString);
        $listNum = explode(',', $numString);
        $errorBooks = array();
        for($i = 0; $i < sizeof($listId); $i++){
            if($listNum[$i] !== '' && !$this->checkBook($listId[$i])) $errorBooks[] = $listId[$i];
        }
        if(sizeof($errorBooks) != 0) return response([
            'error' => $errorBooks,
            'state' => false,
            'header' => 'Order fail!',
            'body' => 'Some books are out of stock are removed. Place order again!',
        ]);

        //books validated
        $price = $this->calculatePrice($request);
        $count = 0;

        for($j = 0; $j < count($listId); $j++){
            if($listNum[$j] !== '') $count += +$listNum[$j];
        }

        $order = Order::create([
            'user_id' => auth()->user()->id,
            'order_amount' => $price,
        ]);
        $id = $order->id;
        for($k = 0; $k < count($listId); $k++){
            if($listNum[$k] !== '')
                OrderItem::create([
                    'order_id' => $id,
                    'book_id' => $listId[$k],
                    'quantity' => $listNum[$k],
                    'price' => round($this->getPrice($listId[$k]), 2),
                ]);
        }
        return response([
            'state' => true,
            'header' => 'Place order successfully!',
            'body' => 'Your order have been placed! Total price is $'.$price,
        ]);
    }
    public function checkBook($id): bool
    {
        if($id > 0) return true;
        else return false;
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //unuse
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
        //unuse
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //unuse
    }

    public function calculatePrice($request): float|int
    {
        $listId = explode(',', $request->get('id'));
        $listNum = explode(',', $request->get('num'));
        $price = 0;
        for($i=0; $i < count($listId); $i++){
            if($listNum[$i] !== '') $price += $listNum[$i] * $this->getPrice($listId[$i]);
        }
        return $price;
    }

    public function getPrice($id){
        $price = Discount::query()
            ->where('discount_start_date', '<=', date('Y-m-d'))
            ->where(function ($query){
                $query->whereNull('discount_end_date')
                    ->orWhere('discount_end_date', '>=', date('Y-m-d'));
            })
            ->groupBy('book_id')
            ->selectRaw('book_id, min(discount_price) as p');
        $book = Book::query()
            ->leftJoinSub($price, 'd', 'book.id', 'd.book_id')
            ->selectRaw('coalesce(d.p, book_price) as price')
            ->where('book.id', $id)
            ->first();
        if($book == null) return 0;
        return $book->price;
    }
}
