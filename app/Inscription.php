<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Formation;
use App\Niveau;

class Inscription extends Model {
  protected $primaryKey = 'id';
  protected $table = 'inscriptions';

  protected $hidden = ['created_at', 'updated_at'];
  protected $fillable = [
    'prenom', 'nom', 'email', 'motivation',
    'domaine', 'niveau', 'experience', 'profession',
    'adresse', 'telephone', 'age', 'idee_projet', 'id_formation'];

  public function formation () {
    return $this->hasOne(Formation::class, 'id', 'id_formation');
  }
  public function niveau () {
    return $this->hasOneThrough(
      'App\Niveau', 
      'App\Formation', 
      'id', 
      'id', 
      'id_formation', 
      'id_niveau');
  }

}

?>

