<?php

namespace SCM\Admin\ECommerce\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductColor extends Model
{
    use HasFactory;

    protected $fillable = [
        'color',
        'shop_product_id',
        'inventory_product_id',
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
