<?php

namespace App\Http\Requests\Site\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class UpdateAvatarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
        ];
    }

    public function getAvatar(): UploadedFile
    {
        /** @var UploadedFile $file */
        $file = $this->validated('avatar');

        return $file;
    }
}
