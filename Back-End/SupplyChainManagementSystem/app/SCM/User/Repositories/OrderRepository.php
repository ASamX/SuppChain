<?php

namespace SCM\User\Repositories;

use SCM\User\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SCM\Base\Repositories\AbstractRepository;

class OrderRepository extends AbstractRepository
{
    private OrderItemRepository $orderItemRepository;
    private OrderHistoryRepository $orderHistoryRepository;

    public function __construct(OrderItemRepository $orderItemRepository, Order $order, OrderHistoryRepository $orderHistoryRepository)
    {
        $this->orderItemRepository = $orderItemRepository;
        $this->orderHistoryRepository = $orderHistoryRepository;
        $this->setModel($order);
    }


    public function store(Request $request)
    {
        $order = new Order();

        if (Auth::user() != null) {
            $order->user_id = Auth::user()->id;
            $order->name = Auth::user()->name;
            $order->email = Auth::user()->email;
        } else {
            $order->name = $request->get('name');
            $order->email = $request->get('email');
        }

        $order->phone = $request->get('phone');
        $order->address = $request->get('address');
        $order->city = $request->get('city');
        $order->state = $request->get('state');
        $order->zipCode = $request->get('zipCode');
        $order->country = $request->get('country');

        $order->shipping_method = $request->get('shipping_method');
        $order->shipping_amount = $request->get('shipping_amount');

        $order->tax_amount = $request->get('tax_amount');
        $order->payment_method = $request->get('payment_method');

        $order->notes = $request->get('notes');

        $order->total = $request->get('total');

        $order->save();

        // $this->orderItemRepository->store($request->input('sessionData'), $order->id);

        return $order;
    }
}
