<?php

use App\Http\Controllers\OnSaleController;
use App\Http\Controllers\RecommendedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('home/on-sale-section', OnSaleController::class)->only('index');
Route::resource('home/recommended-section', RecommendedController::class)->only('index');

