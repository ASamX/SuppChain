<?php

namespace SCM\Admin\Shops\Repositories;

use Illuminate\Http\Request;
use SCM\Base\Repositories\AbstractRepository;
use SCM\Admin\Shops\Models\Sales;
use SCM\Admin\ECommerce\Models\Product;

class SalesRepository extends AbstractRepository
{
    public function __construct(Sales $sales)
    {
        $this->setModel($sales);
    }


    public function store(Request $request, $product_id)
    {
        $product = Product::findOrFail($product_id);
        $sales = new Sales();
        $sales->product_id = $product_id;
        $sales->quantity = $request->get('quantity');
        $sales->shop_id = $request->get('shop_id');
        if($product->quantity > $sales->quantity) {
            $product->quantity -= $sales->quantity; 
            $product->save();
            $sales->save();
            return $sales;
        } else {
            return response()->json(['status' => 'Error', 'msg' => 'Raw Action'], 403);
        }
}


    public function shopHistory($shop_id)
    {
        return Sales::with('product')->where('shop_id', $shop_id)->get();
    }

    public function show($id)
    {
        return Sales::with('product')->where('id', $id)->get();
    }

    public function index()
    {
        return Sales::with('product')->get();
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $sales = Sales::with('product')->where('shop_id', 'like', "%{$search}%")->get();
        } else {
            $sales = Sales::with('product')->get();
        }

        return response()->json($sales);
    }
}
