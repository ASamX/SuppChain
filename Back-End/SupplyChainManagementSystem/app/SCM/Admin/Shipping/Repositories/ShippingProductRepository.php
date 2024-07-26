<?php

namespace SCM\Admin\Shipping\Repositories;

use SCM\Admin\Shipping\Models\Shipping;
use SCM\Admin\Shipping\Models\ShippingProduct;
use SCM\Admin\ECommerce\Models\Product;
use SCM\Base\Repositories\AbstractRepository;

class ShippingProductRepository extends AbstractRepository
{
    public function __construct(ShippingProduct $shippingProduct)
    {
        $this->setModel($shippingProduct);
    }

    public function store($shipping_id, $product_id)
    {
        Shipping::findOrFail($shipping_id);
        Product::findOrFail($product_id);
        $shippingProduct = new ShippingProduct();
        $shippingProduct->shipping_id = $shipping_id;
        $shippingProduct->product_id = $product_id;

        $shippingProduct->save();
        return $shippingProduct;
    }

    public function updateProducts($id, $product_id)
    {
        $shippingProduct = ShippingProduct::findOrFail($id);
        Product::findOrFail($product_id);
        $shippingProduct->product_id = $product_id;

        $shippingProduct->save();
        return $shippingProduct;
    }
}
