<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('authenticated', function () {
        return true;
    });

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('update-user-status', [AuthController::class, 'updateUserStatus']);

    // Users
    Route::post('upload', [UserController::class, 'upload_avatar']);
    Route::get('available-users', [UserController::class, 'getAvailableUsers']);

    // Chat
    Route::post('send-chat-message', [ChatController::class, 'sendChatRoomMessage']);
    Route::get('get-chat-rooms', [ChatController::class, 'getChatRooms']);
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
