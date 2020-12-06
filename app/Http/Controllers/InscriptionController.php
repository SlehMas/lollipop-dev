<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Inscription;

class InscriptionController extends Controller
{
    //

    public function get(Request $request) {

      return response()->json(
        Inscription::all()
        ->load('formation')
        ->load('niveau')
      );
    }

    public function getById(Request $request, $id) {
      $inscription = Inscription::findOrFail($id);
      return response()->json(
        $inscription
      );
    }

    public function save (Request $request) {
      $data = $request->json()->all();
      if (Inscription::create($data)) {
          return response()->json(['success' => 'success'], 201);
      } 
      return response()->json(['error' => 'invalid'], 400);
    }

    public function accept (Request $request, $id) {
      $inscription = Inscription::findOrFail($id);
      $inscription['etat'] = 'valide';

      if ($inscription->save()) {
        return response()->json(['success' => 'success'], 201);
      } 
      return response()->json(['error' => 'invalid'], 400);
    }

    public function refuse (Request $request, $id) {
      $inscription = Inscription::findOrFail($id);
      $inscription['etat'] = 'refus';

      if ($inscription->save()) {
        return response()->json(['success' => 'success'], 201);
      } 
      return response()->json(['error' => 'invalid'], 400);
    }

}
