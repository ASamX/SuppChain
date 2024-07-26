<?php

namespace SCM\Admin\ECommerce\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'shop_product_id',
        'inventory_product_id',
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
