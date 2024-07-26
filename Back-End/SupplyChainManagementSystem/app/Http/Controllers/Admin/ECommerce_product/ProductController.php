<?php

namespace App\Http\Controllers\Admin\ECommerce_product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Repositories\ProductRepository;
use SCM\Admin\ECommerce\Requests\CreateProduct;

class ProductController extends Controller
{
    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function all()
    {
        return $this->productRepository->all();
    }

    public function index($childCategory_id)
    {
        return $this->productRepository->index($childCategory_id);
    }


    public function store(CreateProduct $request, $childCategory_id)
    {
        return $this->productRepository->store($request, $childCategory_id);
    }


    public function show($id)
    {
        return $this->productRepository->show($id);
    }


    public function update(Request $request, $id)
    {
        $data = $request->all();
        return $this->productRepository->edit($data, $id);
    }


    public function destroy($id)
    {
        return $this->productRepository->destroy((int)$id);
    }

    public function search(Request $request)
    {
        return $this->productRepository->search($request);
    }
}
