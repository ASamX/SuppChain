<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\Manufactory\Inventory\Requests\CreateInventoryMaterial;
use SCM\Admin\Manufactory\Inventory\Repositories\MaterialInventoryRepository;

class RawMaterialController extends Controller
{
    private MaterialInventoryRepository $materialInventoryRepository;

    public function __construct(MaterialInventoryRepository $materialInventoryRepository)
    {
        $this->materialInventoryRepository = $materialInventoryRepository;
    }

    public function index()
    {
        return $this->materialInventoryRepository->all();
    }


    public function store(CreateInventoryMaterial $request, $supplier_id)
    {
        return $this->materialInventoryRepository->store($request, $supplier_id);
    }


    public function show($id)
    {
        return $this->materialInventoryRepository->find($id);
    }


    public function update(CreateInventoryMaterial $request, $id)
    {
        $data = $request->all();

        return $this->materialInventoryRepository->edit($data, $id);
    }


    public function destroy($id)
    {
        return $this->materialInventoryRepository->delete((int)$id);
    }

    public function search(Request $request)
    {
        return $this->materialInventoryRepository->search($request);
    }
}
