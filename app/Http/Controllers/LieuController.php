<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lieu;

class LieuController extends Controller
{
  public function save (Request $request) {
    $data = $request->json()->all();
    if ($niveau = Lieu::create($data)) {
      return response()->json(['success' => 'success', 'new' => $niveau->id], 201);
    }
    return response()->json(['error' => 'invalid'], 400);
  } 

  public function get (Request $request) {
    return response()->json(
      Lieu::all()
      );
  }

  public function delete (Request $request, $id) {
    $found = Lieu::findOrFail($id);
    if ($found) {
      $found->delete();
      return response('success', 200);
    }
    return response('not found!', 400);
  }
}
