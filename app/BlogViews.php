<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogViews extends Model
{
    //
    protected $table = 'blog_views';

    public static function createViewLog($blog) {
      $blogViews= new BlogViews();
      $blogViews->id_blog = $blog->id;
      $blogViews->url = \Request::url();
      $blogViews->session_id = \Request::getSession()->getId();
      $blogViews->ip = \Request::getClientIp();
      $blogViews->agent = \Request::header('User-Agent');
      $blogViews->save();
  }

  public static function formatCount($num) {

    if($num>=1000) {
  
          $x = round($num);
          $x_number_format = number_format($x);
          $x_array = explode(',', $x_number_format);
          $x_parts = array('k', 'm', 'b', 't');
          $x_count_parts = count($x_array) - 1;
          $x_display = $x;
          $x_display = $x_array[0] . ((int) $x_array[1][0] !== 0 ? '.' . $x_array[1][0] : '');
          $x_display .= $x_parts[$x_count_parts - 1];
  
          return $x_display;
  
    }
  
    return $num;
  }
}

