<?php

namespace SCM\Admin\Shipping\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SCM\Admin\ECommerce\Models\Product;

class ShippingProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'shipping_id',
    ];

    public function deriver()
    {
        return $this->hasOne(Shipping::class);
    }

    public function product()
    {
        return $this->hasMany(Product::class);
    }
}
