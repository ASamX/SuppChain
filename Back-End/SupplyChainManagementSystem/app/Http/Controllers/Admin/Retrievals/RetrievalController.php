<?php

namespace App\Http\Controllers\Admin\Retrievals;

use App\Http\Controllers\Controller;
use App\SCM\Admin\Retrievals\Repositories\RetrievalRepository;
use Illuminate\Http\Request;

class RetrievalController extends Controller
{
    private RetrievalRepository $retrievalRepository;

    public function __construct(RetrievalRepository $retrievalRepository)
    {
        $this->retrievalRepository = $retrievalRepository;
    }
    public function store(Request $request, $product_id)
    {
        return $this->retrievalRepository->store($request, $product_id);
    }

    public function updateProductId($id, $product_id)
    {
        return $this->retrievalRepository->updateProductId($id, $product_id);
    }

    public function updateStatus(Request $request, $id)
    {
        return $this->retrievalRepository->updateStatus($request, $id);
    }

    public function destroy($id)
    {
        return $this->retrievalRepository->delete($id);
    }
}
