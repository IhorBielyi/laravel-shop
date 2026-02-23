<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class EnsureTokenVersionIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = JWTAuth::parseToken()->authenticate();

        $payload = JWTAuth::parseToken()->getPayload();
        $tokenVersion = (int) ($payload->get('token_version') ?? 0);

        if ($tokenVersion !== (int) $user->token_version) {
            return response()->json([
                'message' => 'Сеанс завершено. Увійдіть знову.',
            ], 401);
        }

        return $next($request);
    }
}
