<?php

use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\OrderHistoryController;
use App\Http\Controllers\User\OrderItemController;
use App\Http\Controllers\User\RatingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('jwt.verify', 'User')->group(function () {

    Route::prefix('rating')->group(function () {

        Route::delete('/', [RatingController::class, 'destroy']);
        Route::post('/product/{product_id}', [RatingController::class, 'store']);
        Route::get('/product/{product_id}', [RatingController::class, 'index']);
        Route::get('/average/product/{product_id}', [RatingController::class, 'CalculateAverageRating']);
    });

    Route::prefix('comment')->group(function () {

        Route::patch('/{id}/product/{product_id}', [CommentController::class, 'update']);
        Route::delete('/{id}', [CommentController::class, 'destroy']);
        Route::post('/product/{product_id}', [CommentController::class, 'store']);
        Route::get('/product/{product_id}', [CommentController::class, 'index']);
    });
});


// Any User
Route::prefix('order')->group(function () {

    Route::get('/{id}', [OrderController::class, 'show']);
    Route::delete('/{id}', [OrderController::class, 'destroy']);
    Route::post('/', [OrderController::class, 'store']);
    Route::get('/', [OrderController::class, 'index']);
});

Route::prefix('orderItem')->group(function () {

    Route::get('/{order_id}', [OrderItemController::class, 'index']);
});

Route::prefix('orderHistory')->group(function () {

    Route::get('/', [OrderHistoryController::class, 'index']);
    Route::get('/{email}', [OrderHistoryController::class, 'userHistory']);
});
