<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SiteViewrController;


Route::get('/properties', [PropertyController::class, 'index']);
Route::post('/properties', [PropertyController::class, 'store']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::put('/properties/{id}', [PropertyController::class, 'update']);
Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);
Route::get('/search/properties', [PropertyController::class, 'search']);
Route::patch('/properties/{id}/increment-views', [PropertyController::class, 'incrementViews']);
Route::patch('/properties/{id}/increment-likes', [PropertyController::class, 'incrementLikes']);
Route::put('/admin/update-password', [AdminController::class, 'updatePassword']);

Route::post('/increment-site-views', [SiteViewrController::class, 'incrementSiteViews']);
Route::get('/dashboard', [AdminController::class, 'dashboard']);
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminController::class, 'register']);
    Route::post('/login', [AdminController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/by-token', [AdminController::class, 'getAdminByToken']); //get admin by token
        Route::get('/', [AdminController::class, 'getAdmins']);//   get all admins
        Route::get('/{id}', [AdminController::class, 'getAdmin']); //get admin by id
        Route::put('/{id}', [AdminController::class, 'updateAdmin']); //update admin by id
        Route::delete('/{id}', [AdminController::class, 'deleteAdmin']);//delete admin by id
        Route::put('/update-password', [AdminController::class, 'updatePassword']);// update password
    });
});
