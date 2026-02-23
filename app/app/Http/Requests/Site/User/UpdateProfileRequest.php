<?php

namespace App\Http\Requests\Site\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
            'firstname' => ['required', 'string', 'max:100'],
            'middlename' => ['required', 'string', 'max:100'],
            'surname' => ['required', 'string', 'max:100'],
            'phone_number' => [
                'required',
                'string',
                'max:30',
                Rule::unique('users', 'phone_number')->ignore($this->user()->id),
            ],
        ];
    }

    public function getFirstName(): string
    {
        return $this->validated('firstname');
    }

    public function getMiddleName(): string
    {
        return $this->validated('middlename');
    }

    public function getSurname(): string
    {
        return $this->validated('surname');
    }

    public function getPhoneNumber(): string
    {
        return $this->validated('phone_number');
    }
}
