<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserProfileResource;
use App\Services\Users\UserService;
use Illuminate\Auth\AuthenticationException;

class UserController extends Controller
{
    private UserService $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @throws AuthenticationException
     */
    public function user(): UserProfileResource
    {
        $user = $this->userService->getUser();

        return new UserProfileResource($user);
    }
}
