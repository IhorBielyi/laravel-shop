<?php

use App\Http\Controllers\Api\Admin\BrandController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware(['auth:api', 'jwt_token_version'])->group(function () {
    Route::get('/profile', [UserController::class, 'user']);
    Route::post('/profile/avatar', [ProfileController::class, 'avatar']);
    Route::post('/profile/update', [ProfileController::class, 'update']);
    Route::post('/profile/update/password', [ProfileController::class, 'updatePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:api', 'jwt_token_version'])
    ->prefix('admin')
    ->group(function () {
        Route::apiResource('brands', BrandController::class);
    });
