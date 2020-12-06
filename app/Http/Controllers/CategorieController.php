<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categorie;

class CategorieController extends Controller
{
    //

    public function save (Request $request) {
      $data = $request->json()->all();
      if ($categorie = Categorie::create($data)) {
        return response()->json(['success' => 'success', 'new' => $categorie->id], 201);
      }
      return response()->json(['error' => 'invalid'], 400);
    }

    public function get (Request $request) {
      return response()->json(
        Categorie::all()
        );
    }

    public function delete (Request $request, $id) {
      $found = Categorie::findOrFail($id);
      if ($found) {
        $found->delete();
        return response('success', 200);
      }
      return response('not found!', 400);
    }
}
