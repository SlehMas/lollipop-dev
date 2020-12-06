<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lieu extends Model
{
  protected $primaryKey = 'id';
  protected $hidden = ['created_at', 'updated_at'];
  protected $table = 'lieux';
  protected $fillable = ['nom'];
}
