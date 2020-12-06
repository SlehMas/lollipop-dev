@extends('common.layout')
@section('title', 'Lollipop | Centre de formation agrée par l\'état tunisien, UX/UI, Accueil')
@section('description', 'Lollipop Training est un centre de formation agrée par l\'état tunisien spécialisé dans le nouvelles technologies créatives.')
@section('keywords', 'Centre Formation, Formation UX/UI, Formation reconnu par l\'état')
@section('content')
<div class="Home container-fluid">
  <div class="row">
    <div class="col-md-6 my-auto text-section">
      <h1>Lollipop Training</h1>
      <p>est un centre de formation agrée par l'état tunisien spécialisé dans le nouvelles technologies créatives.</p>
      <a class="btn btn-lollipop-prim" href="/inscription">Calendrier des formations</a>
    </div>
    <div class="col-md-6 image-section mb-4 mb-md-0">
      <div id="lollipopCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#lollipopCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#lollipopCarousel" data-slide-to="1"></li>
          <li data-target="#lollipopCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="{{asset('/assets/ux_1.svg')}}" alt="Image lollipop formation UX" class="img-fluid" width="500">
          </div>
          <div class="carousel-item">
            <img src="{{asset('/assets/ux_2.svg')}}" alt="Image lollipop formation UX" class="img-fluid" width="500">
          </div>
          <div class="carousel-item">
            <img src="{{asset('/assets/ux_3.svg')}}" alt="Image lollipop formation UX" class="img-fluid" width="500">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
@section('js')
<script>
  $('.carousel').carousel()
</script>
@endsection