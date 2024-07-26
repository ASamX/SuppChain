<?php

namespace App\Http\Controllers\Admin\Shops;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\Shops\Repositories\SalesRepository;

class SalesController extends Controller
{
    private SalesRepository $salesRepository;

    public function __construct(SalesRepository $salesRepository)
    {
        $this->salesRepository = $salesRepository;
    }

    public function index()
    {
        return $this->salesRepository->index();
    }


    public function shopHistory($shop_id)
    {
        return $this->salesRepository->shopHistory($shop_id);
    }


    public function store(Request $request, $product_id)
    {
        return $this->salesRepository->store($request, $product_id);
   }


    public function show($id)
    {
        return $this->salesRepository->show($id);
    }


    public function update(Request $request, $id)
    {
        $data = $request->all();

        return $this->salesRepository->edit($data, $id);
    }


    public function destroy(int $id)
    {
        return $this->salesRepository->delete($id);
    }

    public function search(Request $request)
    {
        return $this->salesRepository->search($request);
    }
}
