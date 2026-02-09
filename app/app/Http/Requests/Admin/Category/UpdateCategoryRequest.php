<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
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
            'parent_id' => [
                'nullable',
                'integer',
                'exists:categories,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')->ignore($this->route('category')?->id),
            ],

            'status' => [
                'nullable',
                'integer',
            ],
        ];
    }

    public function getParentID(): ?int
    {
        return $this->validated('parent_id');
    }

    public function getName(): string
    {
        return $this->validated('name');
    }

    public function getStatus(): ?int
    {
        return $this->validated('status');
    }
}
