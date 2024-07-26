<?php

namespace SCM\Admin\Shops\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SCM\Admin\ECommerce\Models\Product;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'quantity', 'shop_id'];

    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
