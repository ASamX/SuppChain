<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\Suppliers\Requests\CreateSupplier;
use SCM\Admin\Suppliers\Repositories\SupplierRepository;

class SupplierController extends Controller
{
    private SupplierRepository $supplierRepository;

    public function __construct(SupplierRepository $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }


    public function index()
    {
        return $this->supplierRepository->all();
    }


    public function store(CreateSupplier $request)
    {
        return $this->supplierRepository->store($request);
    }


    public function show($id)
    {
        return $this->supplierRepository->find($id);
    }


    public function update(Request $request, $id)
    {
        return $this->supplierRepository->update($request, $id);
    }


    public function destroy(int $id)
    {
        return $this->supplierRepository->destroy($id);
    }

    public function search(Request $request)
    {
        return $this->supplierRepository->search($request);
    }
}
