<?php

namespace SCM\User\Repositories;

use SCM\User\Models\OrderHistory;

class OrderHistoryRepository
{
    public function index()
    {
        return OrderHistory::all();
    }

    public function userHistory($email)
    {
        return OrderHistory::where('email', $email)->get();
    }

    public function store($email, $order_id)
    {
        $orderHistory = new OrderHistory();

        $orderHistory->email = $email;
        $orderHistory->order_id = $order_id;

        $orderHistory->save();
        return $orderHistory;
    }
}
