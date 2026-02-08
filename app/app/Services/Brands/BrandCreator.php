<?php

namespace App\Services\Brands;

use App\Models\Brand;
use RuntimeException;

class BrandCreator
{
    public function create(string $name): Brand
    {
        $name = trim($name);

        if ($name === '') {
            throw new RuntimeException('The brand field cannot be empty. Please provide correct brand name.');
        }

        if (Brand::query()->where('name', $name)->exists()) {
            throw new RuntimeException("Brand {$name} already exists!");
        }

            return Brand::create(['name' => $name]);
    }

}
