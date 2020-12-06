<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Niveau;

class Categorie extends Model {
  protected $primaryKey = 'id';

  protected $hidden = ['created_at', 'updated_at'];
  protected $fillable = [ 'name'];

  public function formations() {
    return $this->belongsTo(Formation::class);
  }
  
}

?>

