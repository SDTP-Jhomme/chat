<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Events\StatusEvent;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json('Email already exist!', 401);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->status = 'online';
        $user->save();

        $token = $user->createToken('API TOKEN')->plainTextToken;

        broadcast(new StatusEvent($user))->toOthers();

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // Get the authenticated user
            $user = Auth::user();

            // Generate an API token for the user
            $token = $user->createToken('API TOKEN')->plainTextToken;
            $user->status = 'online';
            $user->save();

            broadcast(new StatusEvent($user))->toOthers();

            return response()->json([
                'user' => $user,
                'token' => $token
            ], 200);
        } else {
            // Check if user exist
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                $error = 'Email not found!';
            } else {
                // Check if password is correct
                if (!Hash::check($request->password, $user->password)) {
                    $error = 'Password is incorrect!';
                }
            }

            return response()->json($error, 401);
        }
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->status = 'offline';
        $user->save();
        $request->user()->tokens()->delete();
        broadcast(new StatusEvent($user))->toOthers();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function updateUserStatus(Request $request)
    {
        $user = Auth::user();
        $user->status = $request->status;
        $user->save();

        broadcast(new StatusEvent())->toOthers();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
