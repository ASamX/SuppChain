<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SCM\User\Repositories\OrderHistoryRepository;

class OrderHistoryController extends Controller
{
    private OrderHistoryRepository $orderHistoryRepository;

    public function __construct(OrderHistoryRepository $orderHistoryRepository)
    {
        $this->orderHistoryRepository = $orderHistoryRepository;
    }

    public function index()
    {
        return $this->orderHistoryRepository->index();
    }

    public function userHistory($email)
    {
        return $this->orderHistoryRepository->userHistory($email);
    }
}
