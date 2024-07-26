<?php

namespace SCM\Admin\Manufactory\ProductionScheduling\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SCM\Admin\ECommerce\Models\Product;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'quantity', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
