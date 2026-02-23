<?php

namespace App\Http\Controllers\Api;

use App\Enum\Auth\RolesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(RegistrationRequest $request): JsonResponse
    {

        $user = User::create([
            'firstname' => $request->getFirstName(),
            'middlename' => $request->getMiddleName(),
            'surname' => $request->getSurname(),
            'phone_number' => $request->getPhoneNumber(),
            'email' => $request->getEmail(),
            'password' => Hash::make($request->getPassword()),

        ]);

        $user->assignRole(RolesEnum::USER->value);

        $token = auth()->login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'user' => $user->only('name', 'email'),
            'role' =>$user->getRoleNames()->first(),
            'authorization' => [
                'token' => $token,
                'token_type' => 'bearer',
            ]
        ]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        return response()->json([
            'status' => 'success',
            'message' => 'User logged in successfully',
            'user' => $user->only('name', 'email'),
            'role' =>$user->getRoleNames()->first(),
            'authorization' => [
                'token' => $token,
                'token_type' => 'bearer',
            ]
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return Response
     */
    public function logout(): Response
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->noContent();
    }
}
