<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    public function upload_avatar(Request $request)
    {
        $path = Storage::disk('public')->put('images/avatar', $request->file('file'));

        $user = Auth::user();
        $user->avatar = $path;
        $user->save();

        return response()->json($user, 200);
    }
}
