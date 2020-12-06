<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/programmes', 'FormationController@getPage');


Route::group(['prefix' => 'dashboard', 'middleware' => ['admin', 'with_api']], function () {
  Route::get( '/{path?}', function(){
    return view( 'app' );
  });
});

Route::group(['prefix' => 'blog'], function () {
  Route::get('/', 'BlogController@home');
  Route::get('/tags/{tag}', 'BlogController@tags');
  Route::get('/category/{category}', 'BlogController@category');
  Route::get('/search', 'BlogController@search');
  Route::get('/{id}', 'BlogController@getBlogPost');
});


Route::get( '/{path?}', function(){
  return view( 'app' );
});
Route::fallback(function() {
  return view('app');
});