<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Certification;

class CertificationController extends Controller
{

  public function get (Request $request) {
    return response()->json(
      Certification::all()
    );
  }

  public function getById (Request $request, $id) {
    return response()->json(
      Certification::where('id_cert', $id)->firstOrFail()
    );
  }

  public function save (Request $request) {
    $data = $request->json()->all();
    if ($certification = Certification::create($data)) {
      return response()->json(['success' => 'success', 'new' => $certification->id], 201); 
    } 
    return response()->json(['error' => 'invalid'], 400);
  }

  public function delete (Request $request, $id) {
    $found = Certification::findOrFail($id);
    if ($found) {
      $found->delete();
      return response('success', 200);
    }
    return response('not found!', 400);
  }

  public function update (Request $request, $id) {
    $data = $request->json()->all();
    $found = Certification::findOrFail($id);

    if ($found) {
      $found['nom'] = $data['nom'];
      $found['niveau'] = $data['niveau'];
      $found['certificat'] = $data['certificat'];
      $found['date_obtention'] = $data['date_obtention'];

      $found->save();
      return response()->json(['success' => 'success'], 201);
      
    }
    return response()->json(['error' => 'invalid'], 400);
  }
}
