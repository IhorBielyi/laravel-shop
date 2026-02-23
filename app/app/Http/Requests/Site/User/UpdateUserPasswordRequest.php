<?php

namespace App\Http\Requests\Site\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserPasswordRequest extends FormRequest
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
            'old_password' => [
                'required',
                'string',
                'min:8',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ]

        ];
    }

    public function getOldPassword(): string
    {
        return $this->validated('old_password');
    }

    public function getPassword(): string
    {
        return $this->validated('password');
    }
}
