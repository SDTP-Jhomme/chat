<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(User::all(), 200);
    }

    public function upload_avatar(Request $request)
    {
        $path = Storage::disk('public')->put('images/avatar', $request->file('file'));

        $user = User::findOrFail($request->id);
        $user->avatar = $path;
        $user->save();

        return response()->json([
            'avatar' => $path,
            'message' => 'Avatar uploaded successfully'
        ], 200);
    }
}
