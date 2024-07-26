<?php

namespace App\Http\Controllers\Admin\Shipping;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\Shipping\Repositories\DeriverRepository;

class DeriverController extends Controller
{
    private DeriverRepository $deriverRepository;

    public function __construct(DeriverRepository $deriverRepository)
    {
        $this->deriverRepository = $deriverRepository;
    }
    public function index()
    {
        return $this->deriverRepository->all();
    }

    public function store(Request $request)
    {
        return $this->deriverRepository->store($request);
    }

    public function show($id)
    {
        return $this->deriverRepository->find($id);
    }

    public function update(Request $request, $id)
    {
        return $this->deriverRepository->update($request, $id);
    }


    public function destroy($id)
    {
        return $this->deriverRepository->delete($id);
    }
}
