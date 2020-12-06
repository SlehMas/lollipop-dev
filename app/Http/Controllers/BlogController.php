<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blog;
use App\BlogViews;
use App\Tags;
use App\PostCategories;

class BlogController extends Controller
{
  public function search (Request $request) {
    $q = str_replace(
      ['\\', '%', '_'],
      ['\\'.'\\', '\\'.'%', '\\'.'_'],
      $request->input('q')
    );
    $posts = Blog::where('title', 'LIKE', '%'.$q.'%')->simplePaginate(5);
    $tags = Tags::all();
    $postCategories = PostCategories::all();
    return view('bloghome', ['posts' => $posts, 'tags' => $tags, 'post_categories' => $postCategories]);
  }

  public function category (Request $request, $category) {
    $posts = Blog::whereHas('categories', function ($q) use ($category){
      $q->where('nom', $category);
    })->simplePaginate(5);
    $tags = Tags::all();
    $postCategories = PostCategories::all();
    return view('bloghome', ['posts' => $posts, 'tags' => $tags, 'post_categories' => $postCategories]);
  }

  public function tags (Request $request, $tag) {
    $posts = Blog::whereHas('tags', function ($q) use ($tag){
      $q->where('nom', $tag);
    })->simplePaginate(5);
    $tags = Tags::all();
    $postCategories = PostCategories::all();
    return view('bloghome', ['posts' => $posts, 'tags' => $tags, 'post_categories' => $postCategories]);
  }
  public function home (Request $request) {
    $posts = Blog::simplePaginate(5);
    $tags = Tags::all();
    $postCategories = PostCategories::all();
    return view('bloghome', ['posts' => $posts, 'tags' => $tags, 'post_categories' => $postCategories]);
  }

  public function save (Request $request) {
    $data = $request->json()->all();
    if ($blog = Blog::create($data)) {
      $blog->tags()->attach($data['tags']);
      $blog->categories()->attach($data['categories']);
      return response()->json(['success' => 'success', 'new' => $blog->id], 201);
    }
    return response()->json(['error' => 'invalid'], 400);
  } 

  public function delete (Request $request, $id) {
    $found = Blog::findOrFail($id);
    if ($found) {
      $found->delete();
      return response('success', 200);
    }
    return response('not found!', 400);
  }

  public function uploadImage (Request $request) {

    if ($request->hasFile('image')) {
      //  Let's do everything here
      if ($request->file('image')->isValid()) {
        //
        $random_name = substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 1, 10);
        $validated = $request->validate([
            'image' => 'mimes:jpeg,png|max:10240',
        ]);
        $extension = $request->image->extension();
        try {
          $fileName = $random_name.".".$extension;
          $request->image->move(base_path('public/assets/blog'), $fileName);
          return response()->json(['file_name' => $fileName], 200);

        } catch (Exception $e) {
          return response($e, 500);
        }
      }
    }
    return response('error', 500);
  }

  public function getById (Request $request, $id) {
    return response()->json(
      Blog::with('tags')
      ->with('categories')
      ->where('id', $id)
      ->get()
    );
  }

  public function getBlogPost ($permalink) {
    $blog = Blog::where('permalink', $permalink)->firstOrFail();
    $viewsCount = BlogViews::where('id_blog', $blog->id)->count();
    BlogViews::createViewLog($blog);
    return view('blog', ['title' => $blog->title, 'blog' => $blog, 'views' => BlogViews::formatCount($viewsCount)]);
  }

  public function get () {
    return response()->json(
      Blog::all()
      );
  }

  public function update (Request $request, $id) {
    $data = $request->json()->all();
    $found = Blog::findOrFail($id);

    if ($found) {
      $found['title'] = $data['title'];
      $found['content'] = $data['content'];
      $found['permalink'] = $data['permalink'];
      $found->save();

      $found->tags()->sync($data['tags']);
      $found->categories()->sync($data['categories']);

      return response()->json(['success' => 'success'], 201);
      
    }
    return response()->json(['error' => 'invalid'], 400);
  }

  
  public function getTags (Request $request) {
    return response()->json(
      Tags::all()
    );
  }
  public function saveTag (Request $request) {
    $data = $request->json()->all();
    if ($tag = Tags::create($data)) {
      return response()->json(['success' => 'success', 'new' => $tag], 201);
    }
    return response()->json(['error' => 'invalid'], 400);
  }

  public function getCategories (Request $request) {
    return response()->json(
      PostCategories::all()
    );
  }
  public function saveCategory (Request $request) {
    $data = $request->json()->all();
    if ($category = PostCategories::create($data)) {
      return response()->json(['success' => 'success', 'new' => $category], 201);
    }
    return response()->json(['error' => 'invalid'], 400);
  }


}