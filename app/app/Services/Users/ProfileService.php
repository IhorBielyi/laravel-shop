<?php

namespace App\Services\Users;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use LogicException;

class ProfileService
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @throws AuthenticationException
     */
    public function userProfileUpdate(string $firstName, string $middleName, string $surname, string $phoneNumber): User
    {
        $firstName = $this->normalizeField($firstName);
        $middleName = $this->normalizeField($middleName);
        $surname = $this->normalizeField($surname);
        $phoneNumber = $this->normalizeField($phoneNumber);

        $user = $this->userService->getUser();

        $this->checkPhoneNumberUnique($phoneNumber, $user->id);

        $user->update([
            'firstname' => $firstName,
            'middlename' => $middleName,
            'surname' => $surname,
            'phone_number' => $phoneNumber,
        ]);

        return $user;
    }

    /**
     * @throws AuthenticationException
     */
    public function userPasswordUpdate(string $oldPassword, string $password): User
    {
        $user = $this->userService->getUser();

        if (!Hash::check($oldPassword, $user->password)) {
            throw ValidationException::withMessages([
                'old_password' => ['The old password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($password),
            'token_version' => $user->token_version + 1,
        ]);

        return $user;
    }

    /**
     * @throws AuthenticationException
     */
    public function avatarUpload(UploadedFile $avatar): User
    {
        $user = $this->userService->getUser();

        $oldPath = $user->avatar_path;

        $newPath = $avatar->store('avatars', 'public');

        $user->update([
            'avatar_path' => $newPath,
        ]);

        $this->deleteAvatarIfExists($oldPath);

        return $user;
    }

    private function normalizeField(string $field): string
    {
        return trim($field);
    }

    private function checkPhoneNumberUnique(string $phone, ?int $ignoreId = null): void
    {
        $phoneNumber = User::query()->where('phone_number', $phone);

        if ($ignoreId !== null) {
            $phoneNumber->whereKeyNot($ignoreId);
        }

        if ($phoneNumber->exists()) {
            throw new LogicException('The phone number "' . $phone . '" already exists.');
        }
    }

    private function deleteAvatarIfExists(?string $avatarPath): void
    {
        if (!$avatarPath) {
            return;
        }

        if (Storage::disk('public')->exists($avatarPath)) {
            Storage::disk('public')->delete($avatarPath);
        }
    }
}
