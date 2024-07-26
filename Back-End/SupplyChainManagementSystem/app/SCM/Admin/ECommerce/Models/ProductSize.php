<?php

namespace SCM\Admin\ECommerce\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'length',
        'width',
        'height',
        'shop_product_id',
        'inventory_product_id',
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
