<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class DatesFormation extends Model {
  protected $primaryKey = 'id';

  protected $table = 'datesformations';
  protected $fillable = ['id_formation', 'date'];

  protected $hidden = ['id', 'id_formation', 'created_at', 'updated_at'];
  public function formation () {
    return $this->hasOne(Formation::class, 'id', 'id_formation');
  }
  
}

?>

