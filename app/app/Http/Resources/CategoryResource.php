<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'   => $this->id,
            'parent_id' => $this->parent_id,

            'parent_info' => $this->whenLoaded('parent', function () {
                return [
                    'name' => $this->parent->name,
                ];
            }),

            'name' => $this->name,
            'slug' => $this->slug,

            'status' => [
                'name' => $this->status->name
            ]
        ];
    }
}
