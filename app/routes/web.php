<?php

use App\Http\Controllers\Web\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/order', [LandingController::class, 'createOrder']);



Route::get('/test', function () {
    return view('test');
});

Route::get('/form', function () {
    return view('form');
});

Route::get('/table', function () {
    return view('table');
});
