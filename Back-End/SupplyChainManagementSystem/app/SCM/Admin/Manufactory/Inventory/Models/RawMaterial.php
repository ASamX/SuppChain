<?php

namespace SCM\Admin\Manufactory\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity_kg',
        'supplier_id',
    ];
}
