<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'blog', 'middleware' => 'auth:api'], function () {
  Route::get('/', 'BlogController@get');
  Route::get('/tags', 'BlogController@getTags');
  Route::get('/categories', 'BlogController@getCategories');
  Route::get('/{id}', 'BlogController@getById');

  Route::post('/tags', 'BlogController@saveTag');  
  Route::post('/categories', 'BlogController@saveCategory');
  Route::post('/image', 'BlogController@uploadImage');
  Route::post('/', 'BlogController@save');
  Route::put('/{id}', 'BlogController@update');
  Route::delete('/{id}', 'BlogController@delete');
});


Route::group(['prefix' => 'certification'], function () {
  Route::get('/', 'CertificationController@get');
  Route::get('/{id}', 'CertificationController@getById');
  Route::put('/{id}', 'CertificationController@update')->middleware('auth:api');
  Route::delete('/{id}', 'CertificationController@delete')->middleware('auth:api');
  Route::post('/', 'CertificationController@save')->middleware('auth:api');
});

Route::group(['prefix' => 'formation'], function () {
  Route::get('/', 'FormationController@get');
  Route::get('/{id}', 'FormationController@getById');
  Route::put('/{id}', 'FormationController@update')->middleware('auth:api');
  Route::delete('/{id}', 'FormationController@delete')->middleware('auth:api');
  Route::post('/', 'FormationController@save')->middleware('auth:api');
  Route::post('/image', 'FormationController@uploadImage')->middleware('auth:api');
});

Route::group(['prefix' => 'inscription'], function () {
  Route::get('/', 'InscriptionController@get');
  Route::get('/{id}', 'InscriptionController@getById');
  Route::post('/', 'InscriptionController@save')->middleware('auth:api');
  Route::put('/{id}/accept', 'InscriptionController@accept')->middleware('auth:api');
  Route::put('/{id}/refuse', 'InscriptionController@refuse')->middleware('auth:api');
});

Route::group(['prefix' => 'categorie'], function () {
  Route::get('/', 'CategorieController@get');
  Route::delete('/{id}', 'CategorieController@delete')->middleware('auth:api');
  Route::post('/', 'CategorieController@save')->middleware('auth:api');
});

Route::group(['prefix' => 'niveau'], function () {
  Route::get('/', 'NiveauController@get');
  Route::delete('/{id}', 'NiveauController@delete')->middleware('auth:api');
  Route::post('/', 'NiveauController@save')->middleware('auth:api');
});

Route::group(['prefix' => 'lieu'], function () {
  Route::get('/', 'LieuController@get');
  Route::delete('/{id}', 'LieuController@delete')->middleware('auth:api');
  Route::post('/', 'LieuController@save')->middleware('auth:api');
});

Route::group(['prefix' => 'message'], function () {
  Route::get('/', 'MessageController@get');
  Route::get('/unread', 'MessageController@getUnread');
  Route::post('/', 'MessageController@save')->middleware('auth:api');
  Route::patch('/read/{id}', 'MessageController@read')->middleware('auth:api');
  Route::get('/{id}', 'MessageController@getById');
});