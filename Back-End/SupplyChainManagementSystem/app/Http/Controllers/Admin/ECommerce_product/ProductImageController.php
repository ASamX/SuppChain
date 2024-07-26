<?php

namespace App\Http\Controllers\Admin\ECommerce_product;

use App\Http\Controllers\Controller;
use SCM\Admin\ECommerce\Repositories\ProductImageRepository;
use SCM\Admin\ECommerce\Requests\CreateProductImage;

class ProductImageController extends Controller
{
    private ProductImageRepository $productImageRepository;

    public function __construct(ProductImageRepository $productImageRepository)
    {
        $this->productImageRepository = $productImageRepository;
    }

    public function index($shop_product_id)
    {
        return $this->productImageRepository->index($shop_product_id);
    }

    public function store(CreateProductImage $request, $shop_product_id)
    {
        return $this->productImageRepository->store($request, $shop_product_id);
    }

    public function destroy($id)
    {
        return $this->productImageRepository->destroy($id);
    }
}
