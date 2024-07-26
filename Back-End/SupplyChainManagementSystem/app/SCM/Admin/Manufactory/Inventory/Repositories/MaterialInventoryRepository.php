<?php

namespace SCM\Admin\Manufactory\Inventory\Repositories;

use Illuminate\Http\Request;
use SCM\Admin\Manufactory\Inventory\Models\RawMaterial;
use SCM\Base\Repositories\AbstractRepository;

class MaterialInventoryRepository extends AbstractRepository
{
    public function __construct(RawMaterial $rawMaterial)
    {
        $this->setModel($rawMaterial);
    }

    public function store(Request $request, $supplier_id)
    {
        $rawMaterial = new RawMaterial();
        $rawMaterial->name = $request->get('name');
        $rawMaterial->quantity_kg = $request->get('quantity_kg');
        $rawMaterial->supplier_id = $supplier_id;

        $rawMaterial->save();
        return $rawMaterial;
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        if ($search) {
            $rawMaterials = RawMaterial::where('name', 'like', "%{$search}%")->get();
        } else {
            $rawMaterials = RawMaterial::all();
        }

        return response()->json($rawMaterials);
    }
}
