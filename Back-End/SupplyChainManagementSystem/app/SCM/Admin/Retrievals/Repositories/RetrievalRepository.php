<?php

namespace App\SCM\Admin\Retrievals\Repositories;

use App\SCM\Admin\Retrievals\Models\Retrieval;
use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Models\Product;
use SCM\Base\Repositories\AbstractRepository;

class RetrievalRepository extends AbstractRepository
{
    public function __construct(Retrieval $retrieval)
    {
        $this->setModel($retrieval);
    }

    public function store($request, $product_id)
    {
        Product::findOrFail($product_id);
        $retrieval = new Retrieval();
        $retrieval->product_id = $product_id;
        $retrieval->description = $request->get('description');

        $retrieval->save();
        return $retrieval;
    }

    public function updateProductId($id, $product_id)
    {
        Product::findOrFail($product_id);
        $retrieval = Retrieval::findOrFail($id);
        $retrieval->product_id = $product_id;

        $retrieval->save();
        return $retrieval;
    }

    public function updateStatus(Request $request, $id)
    {
        $retrieval = Retrieval::findOrFail($id);
        $retrieval->status = $request->get('status');

        $retrieval->save();
        return $retrieval;
    }
}
