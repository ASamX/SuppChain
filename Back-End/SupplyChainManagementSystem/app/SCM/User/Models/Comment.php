<?php

namespace SCM\User\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SCM\Admin\Shops\Models\Shop_product;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'product_id', 'content'];

    public function Shop_product()
    {
        return $this->belongsTo(Shop_product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
