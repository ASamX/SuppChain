<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\Admin\Manufactory\ProductionScheduling\Repositories\ScheduleRepository;


class ScheduleController extends Controller
{
    private ScheduleRepository $scheduleRepository;

    public function __construct(ScheduleRepository $scheduleRepository)
    {
        $this->scheduleRepository = $scheduleRepository;
    }

    public function index()
    {
        return $this->scheduleRepository->index();

    }


    public function store(Request $request, $product_id)
    {
        return $this->scheduleRepository->store($request, $product_id);
    }


    public function show($id)
    {
        return $this->scheduleRepository->show($id);

    }


    public function update(Request $request,  $schedule_id)
    {
        return $this->scheduleRepository->update($request, $schedule_id);
    }


    public function destroy($id)
    {
        return $this->scheduleRepository->delete($id);
    }
}
