<?php

namespace SCM\Admin\ECommerce\Repositories;

use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Models\ProductColor;
use SCM\Base\Repositories\AbstractRepository;
use SCM\Admin\ECommerce\Models\Product;

class ProductColorRepository extends AbstractRepository
{
    public function __construct(ProductColor $productColor)
    {
        $this->setModel($productColor);
    }

    public function index($product_id)
    {
        Product::findOrFail($product_id);

        return productColor::where('product_id', $product_id)->get();
    }

    public function store(Request $request, $product_id)
    {
        Product::findOrFail($product_id);
        $productColor = new ProductColor();
        $productColor->color = $request->get('color');
        $productColor->product_id = $product_id;

        $productColor->save();
        return $productColor;
    }
}
