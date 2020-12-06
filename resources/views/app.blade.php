<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177239076-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-177239076-1');
  </script>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Lollipop | Centre de formation agrée par l'état tunisien, UX/UI</title>
  <!-- Styles -->
  <link rel="apple-touch-icon" sizes="57x57" href="{{asset('/assets/apple-icon-57x57.png') }}">
  <link rel="apple-touch-icon" sizes="60x60" href="{{asset('/assets/apple-icon-60x60.png') }}">
  <link rel="apple-touch-icon" sizes="72x72" href="{{asset('/assets/apple-icon-72x72.png') }}">
  <link rel="apple-touch-icon" sizes="76x76" href="{{asset('/assets/apple-icon-76x76.png') }}">
  <link rel="apple-touch-icon" sizes="114x114" href="{{asset('/assets/apple-icon-114x114.png') }}">
  <link rel="apple-touch-icon" sizes="120x120" href="{{asset('/assets/apple-icon-120x120.png') }}">
  <link rel="apple-touch-icon" sizes="144x144" href="{{asset('/assets/apple-icon-144x144.png') }}">
  <link rel="apple-touch-icon" sizes="152x152" href="{{asset('/assets/apple-icon-152x152.png') }}">
  <link rel="apple-touch-icon" sizes="180x180" href="{{asset('/assets/apple-icon-180x180.png') }}">
  <link rel="icon" type="image/png" sizes="192x192"  href="{{asset('/assets/android-icon-192x192.png') }}">
  <link rel="icon" type="image/png" sizes="32x32" href="{{asset('/assets/favicon-32x32.png') }}">
  <link rel="icon" type="image/png" sizes="96x96" href="{{asset('/assets/favicon-96x96.png') }}">
  <link rel="icon" type="image/png" sizes="16x16" href="{{asset('/assets/favicon-16x16.png') }}">
  <link rel="manifest" href="{{asset('/assets/manifest.json') }}">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="{{ asset('/assets/ms-icon-144x144.png')}}">
  <meta name="theme-color" content="#ffffff">
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <script src="https://kit.fontawesome.com/a076d05399.js"></script>
</head>

<body>
  <div id="app"></div>

  <script src="{{ asset('js/app.js') }}"></script>
  <script>
    jQuery(function ($) {

      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });
    });

  </script>
</body>

</html>