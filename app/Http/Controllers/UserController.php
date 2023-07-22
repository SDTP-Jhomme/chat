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
        //
    }

    public function getAvailableUsers()
    {
        $user = Auth::user();
        $users = User::whereNotIn('id', [$user->id])->get();
        $users = $users->map(function ($user) {
            $user->avatar = $user->avatar ? '/storage/' . $user->avatar : '/images/avatar/default.png';
            return $user;
        })->toArray();

        return response()->json($users, 200);
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
