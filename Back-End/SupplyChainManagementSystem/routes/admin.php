<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\RawMaterialController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\Retrievals\RetrievalController;
use App\Http\Controllers\Admin\Shipping\DeriverController;
use App\Http\Controllers\Admin\Shipping\ShippingController;
use App\Http\Controllers\Admin\Shipping\ShippingProductController;
use App\Http\Controllers\Admin\Shops\SalesController;
use App\Http\Controllers\Admin\Shops\ShopInformationController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ECommerce_product\ProductColorController;
use App\Http\Controllers\Admin\ECommerce_product\ProductImageController;
use App\Http\Controllers\Admin\ECommerce_product\ProductSizeController;
use App\Http\Controllers\Admin\ECommerce_product\ProductController;

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


Route::middleware('jwt.verify', 'SuperAdmin')->group(function () {

    Route::prefix('FactoryAdminProduct')->group(function () {

        Route::patch('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
        Route::post('/childCategory_id/{id}', [ProductController::class, 'store']);
    });

    Route::prefix('FactoryAdminProductColor')->group(function () {

        Route::delete('/{id}', [ProductColorController::class, 'destroy']);
        Route::post('/product/{id}', [ProductColorController::class, 'store']);
        Route::get('/product/{id}', [ProductColorController::class, 'index']);
    });

    Route::prefix('FactoryAdminProductImage')->group(function () {

        Route::delete('/{id}', [ProductImageController::class, 'destroy']);
        Route::post('/product/{id}', [ProductImageController::class, 'store']);
        Route::get('/product/{id}', [ProductImageController::class, 'index']);
    });

    Route::prefix('FactoryAdminProductSize')->group(function () {

        Route::delete('/{id}', [ProductSizeController::class, 'destroy']);
        Route::post('/product/{id}', [ProductSizeController::class, 'store']);
        Route::get('/product/{id}', [ProductSizeController::class, 'index']);
    });


    Route::prefix('addAdmin')->group(function () {
        Route::post('/', [SuperAdminController::class, 'addAdmin']);
    });


    Route::prefix('suppliers')->group(function () {

        Route::post('/{id}', [SupplierController::class, 'update']);
        Route::delete('/{id}', [SupplierController::class, 'destroy']);
        Route::post('/', [SupplierController::class, 'store']);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////

    // All Users
    Route::get('/allUsers', [SuperAdminController::class, 'allUsers']);

    // Search For User
    Route::get('/search', [SuperAdminController::class, 'search']);

    ////////////////////////////////////////////////////////////////////////////////////////////


    // Shops

    Route::prefix('shopInfo')->group(function () {

        Route::post('/superAdmin/{id}', [ShopInformationController::class, 'update']);
        Route::delete('/superAdmin/{id}', [ShopInformationController::class, 'destroy']);
        Route::post('/superAdmin', [ShopInformationController::class, 'store']);
    });


    ////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////

    // eCommerceCategories
    Route::prefix('categories')->group(function () {

        Route::post('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
        Route::post('/', [CategoryController::class, 'createMainCategory']);
    });

    Route::prefix('childCategories')->group(function () {

        Route::post('/{id}', [CategoryController::class, 'createChildCategory']);
    });


    ////////////////////////////////////////////////////////////////////////////////////////////


    Route::prefix('adminUpdateOrder')->group(function () {

        Route::get('/search', [AdminOrderController::class, 'search']);
        Route::get('/{id}', [AdminOrderController::class, 'show']);
        Route::patch('/{id}', [AdminOrderController::class, 'update']);
        Route::get('/', [AdminOrderController::class, 'index']);
    });

    Route::prefix('retrieval')->group(function () {

        Route::post('/updateStatus/{id}', [RetrievalController::class, 'updateStatus']);
    });



    ////////////////////////////////////////////////////////////////////////////////////////////

    // Shipping 
    Route::prefix('shipping')->group(function () {

        Route::post('/deriver_id/{deriver_id}', [ShippingController::class, 'store']);
        Route::post('/{id}/deriver_id/{deriver_id}', [ShippingController::class, 'updateDeriver']);
        Route::post('/{id}', [ShippingController::class, 'updateDestination']);
        Route::get('/{id}', [ShippingController::class, 'show']);
        Route::get('/destination/{destination}', [ShippingController::class, 'getDeliveryForSpecificDestination']);
        Route::get('/', [ShippingController::class, 'index']);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////

    // Shipping Product
    Route::prefix('shippingProduct')->group(function () {

        Route::post('/delivery_id/{delivery_id}/product_id/{product_id}', [ShippingProductController::class, 'store']);
        Route::post('/{id}/product_id/{product_id}', [ShippingProductController::class, 'updateProducts']);
        Route::delete('/{id}', [ShippingProductController::class, 'destroy']);
        Route::get('/{id}', [ShippingProductController::class, 'show']);
        Route::get('/', [ShippingProductController::class, 'index']);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////

    // Deriver
    Route::prefix('deriver')->group(function () {

        Route::post('/{id}', [DeriverController::class, 'update']);
        Route::delete('/{id}', [DeriverController::class, 'destroy']);
        Route::get('/{id}', [DeriverController::class, 'show']);
        Route::post('/', [DeriverController::class, 'store']);
        Route::get('/', [DeriverController::class, 'index']);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////
});


// Authentication user
Route::middleware('jwt.verify')->group(function () {

    Route::post('/addImage/{id}', [SuperAdminController::class, 'addImage']);
    Route::post('/editProfile/{id}', [SuperAdminController::class, 'editProfile']);
    Route::delete('/deleteImage/{id}', [SuperAdminController::class, 'deleteImage']);
});



// Any User
Route::prefix('product')->group(function () {

    Route::get('/search', [ProductController::class, 'search']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::get('/childCategory_id/{id}', [ProductController::class, 'index']);
    Route::get('/', [ProductController::class, 'all']);
});


Route::prefix('categories')->group(function () {

    Route::get('/search', [CategoryController::class, 'search']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::get('/', [CategoryController::class, 'viewMainCategory']);
});

Route::prefix('childCategories')->group(function () {

    Route::get('/{category_id}', [CategoryController::class, 'viewChildCategory']);
});

Route::prefix('shopInfo')->group(function () {

    Route::get('/search', [ShopInformationController::class, 'search']);
    Route::get('/{id}', [ShopInformationController::class, 'show']);
    Route::get('/', [ShopInformationController::class, 'index']);
});
