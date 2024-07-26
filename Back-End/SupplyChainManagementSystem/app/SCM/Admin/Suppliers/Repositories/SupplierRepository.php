<?php

namespace SCM\Admin\Suppliers\Repositories;

use Illuminate\Http\Request;
use SCM\Admin\Suppliers\Models\Supplier;
use SCM\Base\Repositories\AbstractRepository;
use Illuminate\Support\Facades\Storage;

class SupplierRepository extends AbstractRepository
{
    public function __construct(Supplier $supplier)
    {
        $this->setModel($supplier);
    }

    public function store(Request $request)
    {
        $supplier = new Supplier();
        $supplier->supplier_name = $request->get('supplier_name');
        $supplier->supplier_email = $request->get('supplier_email');
        $supplier->raw_materials = $request->get('raw_materials');
        $supplier->phone = $request->get('phone');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('supplier', 'public');
            $supplier->image = $imagePath;
        }

        $supplier->save();
        return $supplier;
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->supplier_name = $request->get('supplier_name');
        $supplier->supplier_email = $request->get('supplier_email');
        $supplier->raw_materials = $request->get('raw_materials');
        $supplier->phone = $request->get('phone');

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($supplier->image);
            $image = $request->file('image');
            $imagePath = $image->store('supplier', 'public');
            $supplier->image = $imagePath;
        }

        $supplier->save();
        return $supplier;
    }

    public function destroy(int $id)
    {
        $supplier = Supplier::findOrFail($id);

        if (!empty($supplier->image)) {
            Storage::disk('public')->delete($supplier->image);
        }
        $supplier->delete();

        return response()->json(['status' => 'deleted'], 200);
    }

    public function search(Request $request)
    {
        dd($request);
        $search = $request->input('search');
        if ($search) {
            $suppliers = Supplier::where('supplier_name', 'like', "%{$search}%")->get();
        } else {
            $suppliers = Supplier::all();
        }

        return response()->json($suppliers);
    }
}
