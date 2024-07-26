<?php

namespace SCM\Admin\ECommerce\Repositories;

use Illuminate\Http\Request;
use SCM\Base\Repositories\AbstractRepository;

use SCM\User\Models\Order;
use SCM\User\Repositories\OrderHistoryRepository;

class AdminOrderRepository extends AbstractRepository
{
    private OrderHistoryRepository $orderHistoryRepository;

    public function __construct(Order $order, OrderHistoryRepository $orderHistoryRepository)
    {
        $this->setModel($order);
        $this->orderHistoryRepository = $orderHistoryRepository;
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $order->name = $request->get('name');
        $order->email = $request->get('email');

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
        $order->status = $request->get('status');
        if ($request->get('status') == "accept") {
            $this->orderHistoryRepository->store($order->email, $order->id);
        }
        $order->save();

        return $order;
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $orders = Order::where('name', 'like', "%{$search}%")->get();
        } else {
            $orders = Order::all();
        }

        return response()->json($orders);
    }
}
