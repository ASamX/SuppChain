<?php

namespace SCM\Admin\Shipping\Repositories;

use SCM\Admin\Shipping\Models\Deriver;
use SCM\Admin\Shipping\Models\Shipping;
use SCM\Base\Repositories\AbstractRepository;

class ShippingRepository extends AbstractRepository
{
    public function __construct(Shipping $shipping)
    {
        $this->setModel($shipping);
    }

    public function index()
    {
        return Shipping::with('product')->get();
    }

    public function getDeliveryForSpecificDestination($destination)
    {
        return Shipping::with('product')->where('destination', $destination)->get();
    }

    public function show($id)
    {
        return Shipping::with('product')->where('id', $id)->get();
    }

    public function store($request, $deriver_id)
    {
        Deriver::findOrFail($deriver_id);
        $shipping = new Shipping();
        $shipping->destination = $request->get('destination');
        $shipping->deriver_id = $deriver_id;

        $shipping->save();
        return $shipping;
    }

    public function updateDestination($request, $id)
    {
        $shipping = Shipping::findOrFail($id);
        $shipping->destination = $request->get('destination');

        $shipping->save();
        return $shipping;
    }

    public function updateDeriver($id, $deriver_id)
    {
        Deriver::findOrFail($deriver_id);
        $shipping = Shipping::findOrFail($id);
        $shipping->deriver_id = $deriver_id;

        $shipping->save();
        return $shipping;
    }
}
