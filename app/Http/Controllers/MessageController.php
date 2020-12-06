<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;

class MessageController extends Controller
{
    public function get(Request $request) {

      return response()->json(
        Message::all()
      );
    }

    public function getUnread(Request $request) {

      return response()->json(
        Message::where('is_read', 1)->get()
      );
    }


    public function save (Request $request) {
      $data = $request->json()->all();
      if (Message::create($data)) {
          return response()->json(['success' => 'success'], 201);
      } 
      return response()->json(['error' => 'invalid'], 400);
    }

    public function read (Request $request, $id) {
      $message = Message::findOrFail($id);
      $message['is_read'] = 1;

      if ($message->save()) {
        return response()->json(['success' => 'success'], 201);
      } 
      return response()->json(['error' => 'invalid'], 400);
    }

    public function getById (Request $request, $id) {
        return response()->json(Message::findOrFail($id));
    }
}
