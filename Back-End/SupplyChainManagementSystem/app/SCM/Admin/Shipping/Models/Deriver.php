<?php

namespace SCM\Admin\Shipping\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deriver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'car_number',
        'phone',
        'image',
    ];

    public function deriver()
    {
        return $this->hasMany(Shipping::class);
    }
}
