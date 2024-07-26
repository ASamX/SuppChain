<?php

namespace SCM\Admin\Shops\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopInformation extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'shopAdminName', 'image'];
}
