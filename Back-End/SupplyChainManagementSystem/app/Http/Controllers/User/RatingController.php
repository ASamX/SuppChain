<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use SCM\User\Repositories\RatingRepository;
use SCM\User\Requests\CreateRating;

class RatingController extends Controller
{
    private RatingRepository $ratingRepository;

    public function __construct(RatingRepository $ratingRepository)
    {
        $this->ratingRepository = $ratingRepository;
    }

    public function index($product_id)
    {
        return $this->ratingRepository->index($product_id);
    }

    public function store(CreateRating $request, $product_id)
    {
        return $this->ratingRepository->store($request, $product_id);
    }

    public function destroy()
    {
        return $this->ratingRepository->destroy();
    }

    public function CalculateAverageRating($product_id)
    {
        return $this->ratingRepository->CalculateAverageRating($product_id);
    }
}
