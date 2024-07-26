<?php

use App\Http\Controllers\Admin\RawMaterialController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\SupplierController;
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


Route::middleware('jwt.verify', 'FactoryAdmin')->group(function () {


    ////////////////////////////////////////////////////////////////////////////////////////////

    // inventoryMaterials
    Route::prefix('inventoryMaterials/factoryAdmin')->group(function () {

        Route::get('/{id}', [RawMaterialController::class, 'show']);
        Route::patch('/{id}', [RawMaterialController::class, 'update']);
        Route::delete('/{id}', [RawMaterialController::class, 'destroy']);
        Route::post('/supplier_id/{id}', [RawMaterialController::class, 'store']);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////


    Route::prefix('schedule')->group(function () {

        Route::get('/{schedule_id}', [ScheduleController::class, 'show']);
        Route::get('/', [ScheduleController::class, 'index']);
        Route::patch('/{schedule_id}', [ScheduleController::class, 'update']);
        Route::delete('/{schedule_id}', [ScheduleController::class, 'destroy']);
    });
});


Route::middleware('jwt.verify', 'SuperAdminAndFactoryAdmin')->group(function () {

    // inventoryMaterials
    Route::prefix('inventoryMaterials')->group(function () {

        Route::get('/search', [RawMaterialController::class, 'search']);
        Route::get('/', [RawMaterialController::class, 'index']);
    });

    Route::prefix('suppliers')->group(function () {

        Route::get('/{id}', [SupplierController::class, 'show']);
        Route::get('/', [SupplierController::class, 'index']);
        Route::get('/search', [SupplierController::class, 'search']);
    });
});
