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
        $name = $this->normalizeName($name);
        $this->checkNameNotEmpty($name);
        $this->checkNameUnique($name);

        return Brand::create(['name' => $name]);
    }

    public function showBrand(int $id): Brand
    {
        return Brand::query()
            ->select('id', 'name', 'slug')
            ->findOrFail($id);
    }

    public function updateBrand(int $id, string $name): Brand
    {
        /** @var Brand $brand */
        $brand = Brand::query()->findOrFail($id);

        $name = $this->normalizeName($name);
        $this->checkNameNotEmpty($name);

        if ($brand->name === $name) {
            return $brand;
        }

        $this->checkNameUnique($name, $brand->id);

        $brand->update(['name' => $name]);

        return $brand;
    }

    public function deleteBrand(int $id): void
    {
        Brand::query()->findOrFail($id)->delete();
    }

    private function normalizeName(string $name): string
    {
        return trim($name);
    }

    private function checkNameNotEmpty(string $name): void
    {
        if ($name === '') {
            throw new InvalidArgumentException('The brand field cannot be empty. Please provide correct brand name.');
        }
    }

    private function checkNameUnique(string $name, ?int $ignoreId = null): void
    {
        $brandName = Brand::query()->where('name', $name);

        if ($ignoreId !== null) {
            $brandName->whereKeyNot($ignoreId);
        }

        if ($brandName->exists()) {
            throw new LogicException('The brand name "' . $name . '" already exists.');
        }
    }
}
