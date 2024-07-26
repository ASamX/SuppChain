<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use SCM\User\Repositories\OrderItemRepository;

class OrderItemController extends Controller
{
    private OrderItemRepository $orderItemRepository;

    public function __construct(OrderItemRepository $orderItemRepository)
    {
        $this->orderItemRepository = $orderItemRepository;
    }

    public function index($order_id)
    {
        return $this->orderItemRepository->index($order_id);
    }
}
