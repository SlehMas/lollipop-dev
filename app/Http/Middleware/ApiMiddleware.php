<?php

namespace App\Http\Middleware;

use Closure;

class ApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->check() && auth()->user()->is_admin == 1){
            return $next($request);
        }
        else
        {
            return response()->json(['error' => 'UNAUTHORIZED'], 400);
        }
    }
}
