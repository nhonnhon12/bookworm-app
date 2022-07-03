<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderItem;

class CartRepository extends BaseRepository
{
    public function __construct()
    {
        $this->query = OrderItem::query();
    }
    public function getById($id, $conditions)
    {

    }
    public function filter($conditions)
    {

    }
    public function create($data)
    {

    }

    public function update($data)
    {
        // TODO: Implement update() method.
    }
}
