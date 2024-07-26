<?php

namespace App\Http\Controllers\Admin\ECommerce_product;

use App\Http\Controllers\Controller;
use SCM\Admin\ECommerce\Repositories\ProductColorRepository;
use SCM\Admin\ECommerce\Requests\CreateProductColor;

class ProductColorController extends Controller
{
    private ProductColorRepository $productColorRepository;

    public function __construct(ProductColorRepository $productColorRepository)
    {
        $this->productColorRepository = $productColorRepository;
    }

    public function index($shop_product_id)
    {
        return $this->productColorRepository->index($shop_product_id);
    }

    public function store(CreateProductColor $request, $shop_product_id)
    {
        return $this->productColorRepository->store($request, $shop_product_id);
    }

    public function destroy($id)
    {
        return $this->productColorRepository->delete($id);
    }
}
