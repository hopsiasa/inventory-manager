<?php

use App\Http\Controllers\API\JwtAuthController;
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

//Route::group(['middleware' => 'auth:sanctum'], function () {
//    Route::get('/user', [JwtAuthController::class, 'user']);
//
//    Route::post('/logout', [JwtAuthController::class, 'logout']);
//    Route::post('/signup', [JwtAuthController::class, 'signup']);
//
//    Route::apiResource('/users', UserController::class);
//    Route::apiResource('/categories', CategoryController::class);
//    Route::apiResource('/products', ProductController::class);
//    Route::apiResource('/orders', OrderController::class);
//    Route::apiResource('/roles', RoleController::class);
//});
//
//Route::post('/login', [JwtAuthController::class, 'login']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [JwtAuthController::class, 'login']);
    Route::post('logout', [JwtAuthController::class, 'logout']);
    Route::post('refresh', [JwtAuthController::class, 'refresh']);
    Route::get('me', [JwtAuthController::class, 'me']);
});



