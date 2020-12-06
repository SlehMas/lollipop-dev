@extends('common.layout')
@section('title', 'Lollipop | '.$title)
@section('description', 'Formations en design UX/UI, des workshops pour enfants et toutes les niveaux, notre liste des programmes offertes par notre centre de formation reconnu par l\'état')
@section('keywords', 'Formations, Formation UX/UI, Formations pour enfants Formation reconnu par l\'état, Formation en Design, Formation')
@section('content')
<div class="Blog container-fluid px-0">
  <div class="views">
    <i class="fa fa-eye" aria-hidden="true"></i><br/>
    <span class="view_count">{{$views}}</span>
  </div>
  <div class="banner">
    <h1 class="title">{{$blog->title}}</h1>
    <p>Par: {{$blog->author ?? 'Lollipop' }}, le : {{$blog->created_at}}</p>
  </div>
  <div class="body container mt-5">
    {!! $blog->content !!}
  </div>
</div>
@endsection