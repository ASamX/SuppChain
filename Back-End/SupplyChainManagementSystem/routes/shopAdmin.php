<?php

use App\Http\Controllers\Admin\Retrievals\RetrievalController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\Shops\SalesController;
use App\Http\Controllers\Admin\Shops\ShopInformationController;
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


Route::middleware('jwt.verify', 'ShopAdmin')->group(function () {

    Route::prefix('sales')->group(function () {

        Route::get('/shopAdmin/shodAdminInfo', [ShopInformationController::class, 'showShopInfoForSpecificAdmin']);
        Route::patch('/shopAdmin/{id}', [SalesController::class, 'update']);
        Route::delete('/shopAdmin/{id}', [SalesController::class, 'destroy']);
        Route::post('/shopAdmin/product_id/{id}', [SalesController::class, 'store']);
    });

    // Retrieval
    Route::prefix('retrieval')->group(function () {

        Route::post('/product_id/{product_id}', [RetrievalController::class, 'store']);
        Route::post('/{id}/product_id/{product_id}', [RetrievalController::class, 'updateProductId']);
        Route::delete('/{id}', [RetrievalController::class, 'destroy']);
    });


    Route::prefix('schedule')->group(function () {

        Route::post('/product_id/{product_id}', [ScheduleController::class, 'store']);
    });
});





// SuperAdmin And ShopAdmin Route
Route::middleware('jwt.verify', 'SuperAdminAndShopAdmin')->group(function () {

    Route::prefix('sales')->group(function () {

        Route::get('/{id}', [SalesController::class, 'show']);
        Route::get('/shop_id/{id}', [SalesController::class, 'shopHistory']);
        Route::get('/', [SalesController::class, 'index']);
        Route::get('/search', [SalesController::class, 'search']);
    });
});
