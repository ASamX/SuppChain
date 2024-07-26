<?php

namespace SCM\Admin\Shipping\Repositories;

use SCM\Admin\Shipping\Models\Deriver;
use Illuminate\Http\Request;
use SCM\Base\Repositories\AbstractRepository;

class DeriverRepository extends AbstractRepository
{
    public function __construct(Deriver $deriver)
    {
        $this->setModel($deriver);
    }


    public function store($request)
    {
        $deriver = new Deriver();
        $deriver->name = $request->get('name');
        $deriver->car_number = $request->get('car_number');
        $deriver->phone = $request->get('phone');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('deriver', 'public');
            $deriver->image = $imagePath;
        }

        $deriver->save();
        return $deriver;
    }

    public function update(Request $request, $id)
    {
        $deriver = Deriver::findOrFail($id);
        $deriver->name = $request->get('name');
        $deriver->car_number = $request->get('car_number');
        $deriver->phone = $request->get('phone');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('deriver', 'public');
            $data['image'] = $imagePath;
        }

        $deriver->save();
        return $deriver;
    }
}
