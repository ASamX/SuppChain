<?php

namespace SCM\Admin\ECommerce\Repositories;

use Illuminate\Http\Request;
use SCM\Base\Repositories\AbstractRepository;
use SCM\Admin\ECommerce\Models\ProductSize;
use SCM\Admin\ECommerce\Models\Product;

class ProductSizeRepository extends AbstractRepository
{
    public function __construct(ProductSize $productSize)
    {
        $this->setModel($productSize);
    }

    public function index($product_id)
    {
        Product::findOrFail($product_id);

        return ProductSize::where('product_id', $product_id)->get();
    }

    public function store(Request $request, $product_id)
    {
        Product::findOrFail($product_id);
        $productSize = new ProductSize();
        $productSize->length = $request->get('length');
        $productSize->width = $request->get('width');
        $productSize->height = $request->get('height');
        $productSize->Product_id = $product_id;

        $productSize->save();
        return $productSize;
    }
}
