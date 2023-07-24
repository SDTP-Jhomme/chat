<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function createChatRoom(Request $request)
    {
        $selectedUserIds = $request->input('user_ids');
        $selectedUsers = User::whereIn('id', $selectedUserIds)->get();
        $currentUser = Auth::user();

        // Check if a chatroom with the same set of users already exists
        $chatroom = ChatRoom::whereHas('users', function ($query) use ($selectedUserIds, $currentUser) {
            $query->whereIn('users.id', $selectedUserIds)->orWhere('users.id', $currentUser->id);
        }, '=', count($selectedUserIds) + 1)->first();

        if (!$chatroom) {
            // No existing chatroom found, create a new one
            $chatroom = new ChatRoom();
            $chatroom->save();

            $userIds = $selectedUsers->pluck('id')->toArray();
            $userIds[] = $currentUser->id;
            $chatroom->users()->attach($userIds);
        }

        return response()->json($chatroom->fresh('users'), 200);
    }

    public function getChatRooms(Request $request)
    {
        $chatrooms = ChatRoom::with(['users' => function ($query) {
            $query->where('users.id', '<>', 1);
        }])->get()
        ->map(function ($room) {
            $room->users->map(function ($user) {
                $user->avatar = $user->avatar ? '/storage/' . $user->avatar : '/images/avatar/default.png';
                $user->status = $user->status ? $user->status : 'offline';
                return $user;
            })->toArray();
            return $room;
        });

        return response()->json($chatrooms, 200);
    }
}
