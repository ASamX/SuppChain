<?php

namespace App\Http\Controllers\Admin\Shipping;

use App\Http\Controllers\Controller;
use SCM\Admin\Shipping\Repositories\ShippingProductRepository;

class ShippingProductController extends Controller
{
    private ShippingProductRepository $shippingProductRepository;

    public function __construct(ShippingProductRepository $shippingProductRepository)
    {
        $this->shippingProductRepository = $shippingProductRepository;
    }
    public function index()
    {
        return $this->shippingProductRepository->all();
    }

    public function store($shipping_id, $product_id)
    {
        return $this->shippingProductRepository->store($shipping_id, $product_id);
    }

    public function show($id)
    {
        return $this->shippingProductRepository->find($id);
    }

    public function updateProducts($id, $product_id)
    {
        return $this->shippingProductRepository->updateProducts($id, $product_id);
    }


    public function destroy($id)
    {
        return $this->shippingProductRepository->delete($id);
    }
}
