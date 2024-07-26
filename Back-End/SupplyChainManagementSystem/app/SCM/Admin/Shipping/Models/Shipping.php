<?php

namespace SCM\Admin\Shipping\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination',
        'deriver_id',
    ];

    public function deriver()
    {
        return $this->hasOne(Deriver::class);
    }

    public function product()
    {
        return $this->hasMany(ShippingProduct::class);
    }
}
