<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Formation;

class Niveau extends Model {
  protected $primaryKey = 'id';
  protected $hidden = ['created_at', 'updated_at'];
  protected $fillable = [ 'name', 'color'];

  protected $table = 'niveaus';

  public function formation ($id) {
    return $this->belongsTo(Formation::class);
  }

}

?>

