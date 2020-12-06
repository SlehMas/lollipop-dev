<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostCategories extends Model
{
    //
    protected $primaryKey = 'id';
    protected $table = 'post_category';

    protected $hidden = ['updated_at'];
    protected $fillable = [ 'nom'];
}
