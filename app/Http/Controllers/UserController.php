<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function upload_avatar(Request $request)
    {
        $path = Storage::disk('public')->put('images/avatar', $request->file('file'));

        $user = User::findOrFail($request->id);
        $user->avatar = $path;
        $user->save();

        return response()->json('Avatar uploaded successfully', 200);
    }
}
