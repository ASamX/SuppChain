<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use SCM\User\Repositories\OrderRepository;
use SCM\User\Requests\CreateOrder;

class OrderController extends Controller
{
    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index($id)
    {
        return $this->orderRepository->all($id);
    }

    public function store(CreateOrder $request)
    {
        return $this->orderRepository->store($request);
    }


    public function show($id)
    {
        return $this->orderRepository->find($id);
    }

    public function destroy($id)
    {
        return $this->orderRepository->delete((int)$id);
    }
}
