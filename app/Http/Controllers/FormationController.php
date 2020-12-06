<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Formation;
use App\DatesFormation;
use App\Categorie;

class FormationController extends Controller
{

  public function getPage (Request $request) {
    $formations = Formation::all()->where('show_in_page', true)
      ->load('categorie')
      ->load('niveau')
      ->groupBy('id_categorie');


    return view('programmes', ['formations' => $formations]);
  }
  public function get (Request $request) {
    $formations = Formation::query();

    if ($request->input('date')) {
      $from = date("Y-m-d", strtotime("-2 days", strtotime($request->input('date'))));
      $to = date("Y-m-d", strtotime("+30 days", strtotime($request->input('date'))));
      $formations = Formation::whereRaw('id in (SELECT id_formation from datesformations where MONTH(date) = MONTH(?))', [$request->input('date')]);
    }
    if ($request->input('sip')) {
      $formations = $formations->where('show_in_page', true);
    }

    if ($request->input('lieu')) {
      $formations = $formations->where('lieu', $request->input('lieu'));
    }

    if ($request->input('categorie')) {
      $catArray = explode(',', $request->input('categorie'));
      $formations = $formations->whereIn('id_categorie', $catArray);
    }

    return response()->json(
      $formations
        ->get()
        ->load('categorie')
        ->load('datesFormation')
        ->load('niveau')

      );
  }

  public function uploadImage (Request $request) {

    if ($request->hasFile('image')) {
      //  Let's do everything here
      if ($request->file('image')->isValid()) {
        //
        $random_name = substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 1, 10);
        $validated = $request->validate([
            'image' => 'mimes:jpeg,png|max:10240',
        ]);
        $extension = $request->image->extension();
        try {
          $fileName = $random_name.".".$extension;
          $request->image->move(base_path('public/assets/formations'), $fileName);
          return response()->json(['file_name' => $fileName], 200);

        } catch (Exception $e) {
          return response($e, 500);
        }
      }
    }
    return response('error', 500);
  }

  public function delete (Request $request, $id) {
    $found = Formation::findOrFail($id);
    if ($found) {
      $found->delete();
      return response('success', 200);
    }
    return response('not found!', 400);
  }

  public function getById (Request $request, $id) {
    return response()->json(
      Formation::findOrFail($id)
        ->load('categorie')
        ->load('datesFormation')
        ->load('niveau')
    );
  }

  public function save (Request $request) {
    $data = $request->json()->all();
    if ($formation = Formation::create($data)) {
      $datesFormation = collect($data['dates_formation']);
      $datesFormation = $datesFormation->map(function ($df) use ($formation){
        $ndf['id_formation'] = $formation->id;
        $ndf['date'] = $df;
        return $ndf;
      });
      if (DatesFormation::insert($datesFormation->toArray())) {
        return response()->json(['success' => 'success'], 201);
      }
    }
    return response()->json(['error' => 'invalid'], 400);
  }

  public function update (Request $request, $id) {
    $data = $request->json()->all();
    $found = Formation::findOrFail($id);

    if ($found) {
      $found['nom'] = $data['nom'];
      $found['lieu'] = $data['lieu'];
      $found['places'] = $data['places'];
      $found['id_categorie'] = $data['id_categorie'];
      $found['date_debut'] = $data['date_debut'];
      $found['date_fin'] = $data['date_fin'];
      $found['id_niveau'] = $data['id_niveau'];
      $found['description'] = $data['description'];
      $found['image'] = $data['image'];
      $found['show_in_page'] = $data['show_in_page'];
      $found['id'] = $found['id'];

      $found->save();
      DatesFormation::where('id_formation', $found['id'])->delete();
      $datesFormation = collect($data['dates_formation']);
      $datesFormation = $datesFormation->map(function ($df) use ($found){
        $ndf['id_formation'] = $found['id'];
        $ndf['date'] = $df;
        return $ndf;
      });
      if (DatesFormation::insert($datesFormation->toArray())) {
        return response()->json(['success' => 'success'], 201);
      }
    }
    return response()->json(['error' => 'invalid'], 400);
  }
}
