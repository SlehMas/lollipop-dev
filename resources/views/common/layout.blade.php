<!DOCTYPE html>
<html lang="en">
	<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177239076-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-177239076-1');
  </script>
		<meta charset="UTF-8">
		<title>@yield('title')</title>
		@yield('meta')
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="@yield('description')">
    <meta name="keywords" content="@yield('keywords')">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta property="og:title" content="Lollipop.tn, Centre de formation agrée par l'état tunisien">
    <meta property="og:site_name" content="Lollipop Training">
    <meta property="og:url" content="lollipop.tn">
    <meta property="og:description" content="Lollipop Training est un centre de formation agrée par l'état tunisien spécialisé dans le nouvelles technologies créatives.">
    <meta property="og:type" content="business.business">
    <meta property="og:image" content="http://www.lollipop.tn/assets/ux_3.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@LollipopUx">
    <meta name="twitter:title" content="Lollipop training">
    <meta name="twitter:description" content="Lollipop Training est un centre de formation agrée par l'état tunisien spécialisé dans le nouvelles technologies créatives.">
    <meta name="twitter:image" content="http://www.lollipop.tn/assets/ux_3.png">
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
		<link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>

	</head>


	<body>
    <!-- Navbar start -->
    <div class="Header container-fluid">
      <nav class="navbar-sticky navbar navbar-expand-md navbar-light">
        <a href="/" class="navbar-brand">
          <img src="{{ asset('/assets/lollipop.svg') }}" alt="" width="120">
        </a>
        <button  data-toggle="collapse"
                 data-target="#lollipopNav"
                 aria-controls="lollipopNav"
                 aria-expanded="false"
                 aria-label="Toggle navigation"
                 type="button"
                 onclick="toggleIcon()"
                 class="navbar-toggler">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="lollipopNav">
          <ul class="ml-auto mt-1 navbar-nav">
            <li class="nav-item">
              <a class="ml-sm-5 ml-md-5 ml-lg-5" href="/inscription">Calendrier des formations</a>
            </li>
            <li class="nav-item">
              <a class="ml-sm-5 ml-md-5 ml-lg-5" href="/programmes">Nos Programmes</a>
            </li>
            <li class="nav-item">
              <a class="ml-sm-5 ml-md-5 ml-lg-5" href="/team">La Team</a>
            </li>
            <li class="nav-item">
              <a class="ml-sm-5 ml-md-5 ml-lg-5" href="/blog">Blog</a>
            </li>
            <li class="dropdown nav-item">
              <a aria-haspopup="true" id="dropdownMenuButton"
                 href="#"
                 class="ml-sm-5 ml-md-5 ml-lg-5 py-0 dropdown-toggle nav-link"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Certification
              </a>
              <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right"  aria-labelledby="dropdownMenuButton">
                <button type="button" tabindex="0" role="menuitem" class="dropdown-item">
                  <a href="/blog/ajouter-certificat-dans-linkedin">Comment ajouter dans votre profil LinkedIn?</a>
                </button>
              </div>
            </li>
            <li class="nav-item">
              <button class="btn btn-lollipop-sec ml-sm-5 ml-md-5 ml-lg-5" style="
                padding-top: 2px;"  data-toggle="modal" data-target="#contactModal">Contact</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="contactModalLabel" aria-hidden="true">
      <div class="modal-dialog contactModal" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div style="text-align: center;">
              <h1>Contactez Nous</h1>
              <input type="email" name="email" id="email" placeholder="Email *" class="lollipop-input mb-4">
              <p class="error_email">Le email est requis</p>
              <input type="text" name="objet" id="objet" placeholder="Objet" class="lollipop-input mb-4">
              <textarea cols="60" id="message" rows="5"
              class="idea-textarea" name="message" placeholder="Votre message"
              style="resize: none; padding-top: 10px; padding-left: 10px; border-radius: 10px; max-width: 100%;"></textarea>
              <p class="error_message">Le message est requis</p>
            </div>
          </div>
          <div class="modal-footer" style="display: flex; justify-content: space-between;">
            <div class="ml-auto" style="max-width: 170px;">
            <button class="btn btn-lollipop-prim" onclick="sendMessage()">Envoyer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div aria-live="polite" aria-atomic="true" style="position: absolute; min-height: 200px; top: calc(90% - 70px); min-width: 350px; z-index: 1000;">
      <div class="toast toast_success" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: rgba(0, 0, 255, 0.4)">
        <div class="toast-header">
          <strong class="mr-auto">Merci!</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          Votre message est envoyé!
        </div>
      </div>
      <div class="toast toast_error" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: rgba(255, 0, 0, 0.4)">
        <div class="toast-header">
          <strong class="mr-auto">Oh non!</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          Une erreur est survenue, essayer plus tard!
        </div>
      </div>
    </div>
    <!-- Navbar end -->
    @yield('content')

    <div class="Footer">
      <strong>&#169; 2020 Lollipop Training. All rights reserved.</strong>
      <ul class="ml-auto social-nav nav">
        <li class="nav-item mt-2 mr-5">Suivez-nous</li>
        <li class="nav-item"><a href="https://www.instagram.com/lollipop.training/" target="_blank" class="nav-link"><img src="{{ asset('/assets/instagram-500px.svg') }}"
              class="social-nav-icon" alt="Linkedin logo" width="25"></a></li>
        <li class="nav-item"><a href="https://twitter.com/LollipopUx" target="_blank" class="nav-link"><img src="{{ asset('/assets/twitter-500px.svg') }}"
              class="social-nav-icon" alt="Linkedin logo" width="25"></a></li>
        <li class="nav-item"><a href="https://www.linkedin.com/company/lollipoptraining/" target="_blank" class="nav-link"><img src="{{ asset('/assets/linkedin-500px.svg') }}"
              class="social-nav-icon" alt="Linkedin logo" width="25"></a></li>
        <li class="nav-item"><a href="https://www.facebook.com/lollipoptraining/" target="_blank" class="nav-link"><img src="{{ asset('/assets/fb-500px.svg') }}"
              class="social-nav-icon" alt="Linkedin logo" width="25"></a></li>

      </ul>
    </div>

    <script src="{{ asset('/js/jquery.min.js') }}"></script>
		<script src="{{ asset('/js/popper.js') }}"></script>
    <script src="{{ asset('/js/bootstrap.min.js') }}"></script>
    <script>
      const toggleIcon = () => $('.navbar-toggler').toggleClass('toggle-open')

      function sendMessage () {
        let emailErr = false
        let messageErr = false
        $('.error_email').hide()
        $('.error_message').hide()

        $('#email').removeClass('error')
        $('#message').removeClass('error_full_border')
        if (!$('#email').val()) {
          emailErr = true
          $('#email').addClass('error')
          $('.error_email').show()
        }
        if (!$('#message').val()) {
         $('#message').addClass('error_full_border')
         $('.error_message').show()
          messageErr = true
        }

        if (emailErr || messageErr) {
          return
        }

        $.ajax({
          method: 'POST',
          url: window.location.origin + '/api/message',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify({
            email: $('#email').val(),
            object: $('#objet').val(),
            message: $('#message').val()
          })
          ,
          success: function(data){
            $('.btn-lollipop-sec').click()
            document.querySelector('.toast_success').style.display = 'inline'
            setTimeout(() => {
              document.querySelector('.toast_success').style.display = 'none'
            }, 1500);
          },
          error: function(errMsg) {
            document.querySelector('.toast_error').style.display = 'inline'
            setTimeout(() => {
              document.querySelector('.toast_error').style.display = 'none'

            }, 1500);
          }
        })
      }
    </script>
    @yield('js')
	</body>
</html>
