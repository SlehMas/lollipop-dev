@extends('common.layout')
@section('title', 'Lollipop | Centre de formation agrée par l\'état tunisien, UX/UI, Nos Programmes')
@section('description', 'Formations en design UX/UI, des workshops pour enfants et toutes les niveaux, notre liste des programmes offertes par notre centre de formation reconnu par l\'état')
@section('keywords', 'Formations, Formation UX/UI, Formations pour enfants Formation reconnu par l\'état, Formation en Design, Formation')
@section('content')

<div class="NosProgrammes container mt-5">
@foreach ($formations as $f)
  <h3>{{$f[0]->categorie->name}}</h3>
  <div class="row">
  @foreach($f as $a)
    <div class="col-12 col-sm-4">
      <img src="../assets/formations/{{$a->image}}" class="big_img img-fluid">
      <button
        class="btn btn-lollipop-sec mr-3 pr-3">
        <img src="../../public/assets/icons/debutant.png" width="10"class="mr-2">{{$a->niveau->name}}
      </button>
      <div class="title title_debutant" style="border-color: {{$a->niveau->color}}">
        <h1>{{$a->nom}}</h1>
      </div>
      {!! $a->description !!}
    </div>
    @endforeach
  </div>
@endforeach
</div>
@endsection
