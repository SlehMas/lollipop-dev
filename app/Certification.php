<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{

    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = [ 'nom', 'certificat', 'niveau', 'date_obtention', 'id_cert'];
    
}
