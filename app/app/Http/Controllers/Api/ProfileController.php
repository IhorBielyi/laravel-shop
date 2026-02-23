<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Site\User\UpdateAvatarRequest;
use App\Http\Requests\Site\User\UpdateProfileRequest;
use App\Http\Requests\Site\User\UpdateUserPasswordRequest;
use App\Http\Resources\UserProfileResource;
use App\Services\Users\ProfileService;
use Illuminate\Auth\AuthenticationException;

class ProfileController extends Controller
{
    private ProfileService $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    /**
     * @throws AuthenticationException
     */
    public function update(UpdateProfileRequest $request): UserProfileResource
    {
        $user = $this->profileService->userProfileUpdate(
            $request->getFirstName(),
            $request->getMiddleName(),
            $request->getSurname(),
            $request->getPhoneNumber(),
        );

        return new UserProfileResource($user);
    }

    /**
     * @throws AuthenticationException
     */
    public function updatePassword(UpdateUserPasswordRequest $request): UserProfileResource
    {
        $user = $this->profileService->userPasswordUpdate(
            $request->getOldPassword(),
            $request->getPassword(),
        );

        return new UserProfileResource($user);
    }

    /**
     * @throws AuthenticationException
     */
    public function avatar(UpdateAvatarRequest $request): UserProfileResource
    {
        $user = $this->profileService->avatarUpload($request->getAvatar());

        return new UserProfileResource($user);
    }
}
