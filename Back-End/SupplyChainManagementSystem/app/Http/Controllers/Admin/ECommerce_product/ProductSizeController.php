<?php

namespace App\Http\Controllers\Admin\ECommerce_product;

use App\Http\Controllers\Controller;
use SCM\Admin\ECommerce\Repositories\ProductSizeRepository;
use SCM\Admin\ECommerce\Requests\CreateProductSize;

class ProductSizeController extends Controller
{
    private ProductSizeRepository $productSizeRepository;

    public function __construct(ProductSizeRepository $productSizeRepository)
    {
        $this->productSizeRepository = $productSizeRepository;
    }

    public function index($shop_product_id)
    {
        return $this->productSizeRepository->index($shop_product_id);
    }

    public function store(CreateProductSize $request, $shop_product_id)
    {
        return $this->productSizeRepository->store($request, $shop_product_id);
    }

    public function destroy($id)
    {
        return $this->productSizeRepository->delete($id);
    }
}
