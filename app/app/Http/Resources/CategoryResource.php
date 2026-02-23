<?php

namespace App\Http\Resources;

use App\Enum\Admin\CategoryStatus;
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
            'id' => $this->id,

            'parent' => $this->whenLoaded('parent', function () {
                return [
                    'id' => $this->parent_id,
                    'name' => $this->parent->name,
                ];
            }),

            'name' => $this->name,
            'slug' => $this->slug,

            'status' => $this->status
        ];
    }
}
