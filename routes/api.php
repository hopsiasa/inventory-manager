<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;
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

require __DIR__.'/auth.php';

// Route::middleware('auth:api')->group(function () {
//     Route::get('/users', [UserController::class, 'show'])
//         ->name('users.show');
// });

// Route::middleware(['auth:api', 'verified'])->group(function () {
//     Route::patch('/users', [UserController::class, 'update'])
//         ->name('users.update');
// });

Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/products', ProductController::class);
    Route::apiResource('/orders', OrderController::class);
    Route::apiResource('/roles', RoleController::class);
});

// Route::post('/login', [AuthController::class, 'login']);
