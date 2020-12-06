<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //
    protected $primaryKey = 'id';
    protected $table = 'blog';

    protected $hidden = ['updated_at'];
    protected $fillable = [ 'title', 'author', 'content', 'permalink', 'views'];

    public function views () {
      return $this->hasMany(BlogViews::class, 'id_blog');
    }
    public function tags(){
        return $this->belongsToMany('App\Tags', 'blog_post_tag', 'id_blog', 'id_tag');
    }
    public function categories(){
      return $this->belongsToMany('App\PostCategories', 'blog_post_category', 'id_blog', 'id_category');
  }

}
