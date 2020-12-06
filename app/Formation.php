<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\DatesFormation;
use App\Niveau;
use App\Inscription;
use App\Categoie;
use \DB;

class Formation extends Model {
  protected $primaryKey = 'id';
  protected $hidden = ['created_at', 'updated_at'];
  protected $fillable = ['nom', 'lieu', 'places', 'id_categorie', 'id_niveau', 'date_debut', 'date_fin', 'image', 'show_in_page', 'description'];

  public function datesFormation () {
    return $this->hasMany(DatesFormation::class, 'id_formation');
  }

  public function categorie () {
    return $this->hasOne(Categorie::class, 'id', 'id_categorie');
  }
  public function niveau () {
    return $this->hasOne(Niveau::class, 'id', 'id_niveau');
  }
  public function places () {
    return Inscription::where('id_formation', $this->id)->where('etat', 'valide')->count();
  }
}

?>

