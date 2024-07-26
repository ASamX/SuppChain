<?php

namespace SCM\User\Repositories;

use SCM\User\Models\OrderItem;

class OrderItemRepository
{
    public function index($order_id)
    {
        return OrderItem::where('order_id', $order_id)->get();
    }

    public function store($sessionData, $order_id)
    {
        $sessionItems = explode(',', $sessionData);

        foreach ($sessionItems as $item) {
            [$subtotal, $itemId, $quantity] = explode('-', $item);

            $orderItem = new OrderItem();
            $orderItem->subtotal = $subtotal;
            $orderItem->product_id = $itemId;
            $orderItem->quantity = $quantity;
            $orderItem->order_id = $order_id;
            $orderItem->save();
        }
    }
}
