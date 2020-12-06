@extends('common.layout')
@section('title', 'Lollipop | Lollipop Blog')
@section('description', 'Formations en design UX/UI, des workshops pour enfants et toutes les niveaux, notre liste des programmes offertes par notre centre de formation reconnu par l\'état')
@section('keywords', 'Formations, Formation UX/UI, Formations pour enfants Formation reconnu par l\'état, Formation en Design, Formation')
@section('content')
<div class="BlogHome container-fluid px-0">
  <div class="row mx-0">
    <div class="col-12 col-sm-3 mb-5 mb-sm-0">
      <form action="/blog/search" method="GET">
        <div class="search">
          <input class="input input--search search-input" type="search" name="q" placeholder="Recherchez">
        </div>
      </form>
       <!-- Tags  -->
      <section class="tags mt-4">
        <h5>Publication par tag</h5>
        <ul class="tags-list">
          @foreach($tags as $tag)
            <li class="tag"><a href="/blog/tags/{{$tag->nom}}">{{$tag->nom}}</a></li>
          @endforeach
        </ul>
      </section>
      <!-- Categories -->
      <section class="tags mt-4">
        <h5>Publication par categorie</h5>
        <ul class="tags-list">
          @foreach($post_categories as $post_category)
            <li class="tag--category"><a href="/blog/category/{{$post_category->nom}}">{{ $post_category->nom }}</a></li>
          @endforeach
        </ul>
      </section>
    </div>
    <div class="col-12 col-sm-9 blog_list">
     @forelse($posts as $post)
      <div class="blog_item">
        Par: {{$post->author ?? 'Lollipop'}}, le {{$post->created_at}}
        <div class="blog_item_banner">
          <h1>{{$post->title}}</h1>
        </div>
        <div class="blog_item_body mb-5">
          {!! \Illuminate\Support\Str::limit($post->content, 550, $end='...') !!}
        </div>
        <a href="/blog/{{$post->permalink}}" class="read_more">Lisez la suite</a>
        <hr class="my-5">
      </div>
    @empty
      <h3 class="ml-5">Il n'y a actuellement aucun article de blog</h3>
     @endforelse
     <div class="blog_pagination">
       {{ $posts->withQueryString()->links() }}
     </div>
    </div>
    
  </div>
</div>
@endsection