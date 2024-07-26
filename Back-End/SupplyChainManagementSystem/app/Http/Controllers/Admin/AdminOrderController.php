<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Repositories\AdminOrderRepository;
use SCM\User\Requests\CreateOrder;

class AdminOrderController extends Controller
{
    private AdminOrderRepository $adminOrderRepository;

    public function __construct(AdminOrderRepository $adminOrderRepository)
    {
        $this->adminOrderRepository = $adminOrderRepository;
    }


    public function index()
    {
        return $this->adminOrderRepository->all();
    }


    public function show($id)
    {
        return $this->adminOrderRepository->find($id);
    }


    public function update(CreateOrder $request, $id)
    {
        return $this->adminOrderRepository->update($request, $id);
    }

    public function search(Request $request)
    {
        return $this->adminOrderRepository->search($request);
    }
}
