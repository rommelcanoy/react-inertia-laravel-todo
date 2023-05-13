<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Test');
});

Route::controller(TodoController::class)->group(function () {
    Route::get('/', 'index')->name('todo.home');
    Route::get('/get-todo', 'getTodo')->name('todo.get-todo');
    Route::post('store', 'store')->name('todo.store');
    Route::put('/update/{id}', 'update')->name('todo.update');
    Route::delete('/delete/{id}', 'destroy')->name('todo.destroy');
});
