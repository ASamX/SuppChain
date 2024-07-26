<?php

namespace SCM\User\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SCM\Admin\Shops\Models\Shop_product;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'rating', 'product_id'];

    public function Shop_product()
    {
        return $this->belongsTo(Shop_product::class);
    }
}
