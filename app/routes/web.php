<?php

use App\Http\Controllers\Web\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/order', [LandingController::class, 'createOrder']);



