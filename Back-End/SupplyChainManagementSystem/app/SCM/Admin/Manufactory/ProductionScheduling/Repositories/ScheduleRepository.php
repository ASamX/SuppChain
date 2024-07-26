<?php

namespace SCM\Admin\Manufactory\ProductionScheduling\Repositories;

use Illuminate\Http\Request;
use SCM\Admin\ECommerce\Models\Product;
use SCM\Admin\Manufactory\Inventory\Models\RawMaterial;
use SCM\Base\Repositories\AbstractRepository;
use SCM\Admin\Manufactory\ProductionScheduling\Models\Schedule;

class ScheduleRepository extends AbstractRepository
{
    public function __construct(Schedule $schedule)
    {
        $this->setModel($schedule);
    }

    public function index()
    {
        return Schedule::with('product')->get();
    }


    public function store(Request $request, $product_id)
    {

        $schedule = new Schedule();

        $schedule->quantity = $request->get('quantity');
        $schedule->product_id = $product_id;

        $schedule->save();
        return $schedule;
    }

    public function update(Request $request, $schedule_id)
    {

        $schedule = Schedule::findOrFail($schedule_id);

        $schedule->status = $request->get('status');
        if($schedule->status === "accept" || $schedule->status === "Accept")
        {
            $product = Product::findOrFail($schedule->product_id);
            $product->quantity = $product->quantity + $schedule->quantity;
            $product->active = true; 
            $rawMaterialQuantity = $product->raw_material_quantity_kg * $schedule->quantity;
            $raw_material = RawMaterial::where('name', $product->raw_material_name)->first();
            if($raw_material->quantity_kg > $rawMaterialQuantity)
            {
                $raw_material->quantity_kg = $raw_material->quantity_kg - $rawMaterialQuantity;
                $raw_material->save();
                $product->save();
            } else {
                return response()->json(['status' => 'Error', 'msg' => 'Raw Action'], 403);
            }
        }

        $schedule->save();
        return $schedule;
    }

    public function show($id)
    {
        return Schedule::with('product')->where('id', $id)->first();
    }
}
