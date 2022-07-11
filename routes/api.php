<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OnSaleController;
use App\Http\Controllers\PopularController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\RecommendedController;
use App\Http\Controllers\ReviewsController;
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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::get('books/get-top-discount', OnSaleController::class);
Route::get('books/get-recommended', RecommendedController::class);
Route::get('books/get-popular', PopularController::class);
Route::resource('books', BooksController::class)->only(['index', 'show']);
Route::resource('reviews', ReviewsController::class)->only(['index', 'store']);
Route::get('authors', AuthorController::class);
Route::get('categories', CategoryController::class);
Route::get('price', PriceController::class);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource('cart', CartController::class)->only('store');
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', 'UserController@index');
});
