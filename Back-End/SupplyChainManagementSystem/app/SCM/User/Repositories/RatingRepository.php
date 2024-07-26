<?php

namespace SCM\User\Repositories;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use SCM\User\Models\Rating;

class RatingRepository
{
    public function index($product_id)
    {
        return Rating::where('product_id', $product_id)->get();
    }


    public function store(Request $request, $product_id)
    {
        $user_id = Auth::user()->id;

        $existingRating = Rating::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->first();

        if ($existingRating) {
            return response()->json(['message' => 'You have already submitted a rating for this product.'], 422);
        }

        $rating = new Rating();
        $rating->rating = $request->get('rating');
        $rating->user_id = $user_id;
        $rating->product_id = $product_id;
        $rating->save();

        return $rating;
    }


    public function CalculateAverageRating($product_id)
    {
        return Rating::where('product_id', $product_id)->avg('rating');
    }


    public function destroy()
    {
        $like = Rating::where('user_id', Auth::user()->id);

        if (!$like) {
            return response()->json(['status' => 'Not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $like->delete();

        return response()->json(['status' => 'deleted'], 200);
    }
}
