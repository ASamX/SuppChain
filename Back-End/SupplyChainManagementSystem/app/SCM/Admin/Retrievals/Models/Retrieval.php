<?php

namespace App\SCM\Admin\Retrievals\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SCM\Admin\ECommerce\Models\Product;

class Retrieval extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'status',
        'description',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
