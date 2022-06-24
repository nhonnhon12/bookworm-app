<?php

namespace App\Repositories;

abstract class BaseRepository
{
    protected $query;

    public function applyPagination() {
        $this->query->paginate();
    }
    public abstract function getById($id, $conditions);
    public abstract function filter($conditions);
    public abstract function create($data);
    public abstract function update($data);
}
