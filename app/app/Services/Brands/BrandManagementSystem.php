<?php

namespace App\Services\Brands;

use App\Models\Brand;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use InvalidArgumentException;
use LogicException;

class BrandManagementSystem
{
    public function paginateBrands(int $perPage = 10): LengthAwarePaginator
    {
        return Brand::query()
            ->select('id', 'name', 'slug')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function createBrand(string $name): Brand
    {
        $name = trim($name);

        if ($name === '') {
            throw new InvalidArgumentException('The brand field cannot be empty. Please provide correct brand name.');
        }

        if (Brand::query()->where('name', $name)->exists()) {
            throw new LogicException("Brand {$name} already exists!");
        }

        return Brand::create(['name' => $name]);
    }

    // Уточнити наскільки потрібен даний метод ????
    public function showBrand(Brand $brand): Brand
    {
        return $brand;
    }

    public function updateBrand(Brand $brand, string $name): Brand
    {
        $name = trim($name);

        if ($name === '') {
            throw new InvalidArgumentException('The brand field cannot be empty. Please provide correct brand name.');
        }

        if ($brand->name === $name) {
            return $brand;
        }

        if (Brand::query()->where('name', $name)->exists()) {
            throw new LogicException("Brand {$name} already exists!");
        }

        $brand->update(['name' => $name]);

        return $brand;
    }

    public function deleteBrand(Brand $brand)
    {
        $brand->delete();
    }

}
