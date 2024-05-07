<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => to_route('login'));

Route::middleware('auth')->prefix('subscriptions')->as('subscriptions.')->group(function () {
    Route::get('/', [SubscriptionController::class, 'index'])->name('index');
    Route::get('/create', [SubscriptionController::class, 'create'])->name('create');
    Route::post('/', [SubscriptionController::class, 'store'])->name('store');
    Route::get('/{subscription}/edit', [SubscriptionController::class, 'edit'])->name('edit');
    Route::put('/{subscription}', [SubscriptionController::class, 'update'])->name('update');
    Route::delete('/{subscription}', [SubscriptionController::class, 'destroy'])->name('destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
