<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model {
  protected $primaryKey = 'id';
  protected $hidden = ['updated_at'];
  protected $fillable = ['is_read', 'email', 'objet', 'message'];
  protected $table = 'messages';

}

?>

