<?php

namespace App\Http\Controllers\Admin\Shipping;

use App\Http\Controllers\Controller;
use SCM\Admin\Shipping\Repositories\ShippingRepository;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    private ShippingRepository $shippingRepository;

    public function __construct(ShippingRepository $shippingRepository)
    {
        $this->shippingRepository = $shippingRepository;
    }
    public function index()
    {
        return $this->shippingRepository->index();
    }

    public function getDeliveryForSpecificDestination($destination)
    {
        return $this->shippingRepository->getDeliveryForSpecificDestination($destination);
    }

    public function show($id)
    {
        return $this->shippingRepository->show($id);
    }

    public function store(Request $request, $deriver_id)
    {
        return $this->shippingRepository->store($request, $deriver_id);
    }


    public function updateDestination(Request $request, $id)
    {
        return $this->shippingRepository->updateDestination($request, $id);
    }

    public function updateDeriver($id, $deriver_id)
    {
        return $this->shippingRepository->updateDeriver($id, $deriver_id);
    }
}
