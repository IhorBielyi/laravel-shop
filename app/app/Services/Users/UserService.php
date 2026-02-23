<?php

namespace App\Services\Users;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

class UserService
{
    /**
     * @throws AuthenticationException
     */
    public function getUser(): User
    {
        $user = Auth::user();

        if (!$user) {
            throw new AuthenticationException('Unauthenticated.');
        }

        return $user;
    }
}
