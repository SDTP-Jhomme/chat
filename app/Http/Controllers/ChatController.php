<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function sendChatRoomMessage(Request $request)
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

        $message = new ChatMessage();
        $message->message = $request->message;
        $message->chat_room_id = $chatroom->id;
        $message->user_id = Auth::id();
        $message->save();

        $chatroom->messages()->save($message);

        // Load the chatroom with the latest message and its user
        $chatroom->load(['messages', 'users']);

        return response()->json($chatroom, 200);
    }

    public function getChatRooms(Request $request)
    {
        $chatrooms = ChatRoom::with(['users' => function ($query) {
            $query->where('users.id', '<>', Auth::id());
        }, 'messages'])
        ->get()
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
