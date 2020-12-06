<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    //
    protected $primaryKey = 'id';
    protected $table = 'post_tags';

    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = [ 'nom'];
}
