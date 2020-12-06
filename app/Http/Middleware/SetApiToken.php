<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie as Cookie;
use Illuminate\Support\Carbon as Carbon;
class SetApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
      $user = Auth::user();
      if ($user) {
        $response = $next($request);
        if($request->hasCookie('api_token')) {
          // TODO: check if cookie is expired
          return $response;
        }
        $cookie = Cookie::make('api_token', $user->createToken('authToken')->accessToken, 144000, null, null, false, false);
        return $response->withCookie($cookie);
      }

      return $next($request);
    }
}
