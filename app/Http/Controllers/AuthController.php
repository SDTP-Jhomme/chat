<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the user login request
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (!Auth::attempt($validatedData)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Generate an API token for the user
        $token = $user->createToken('API TOKEN')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }
}
