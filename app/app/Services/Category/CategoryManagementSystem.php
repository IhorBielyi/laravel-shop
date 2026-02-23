<?php

namespace App\Services\Category;

use App\Enum\Admin\CategoryStatus;
use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use InvalidArgumentException;
use LogicException;

class CategoryManagementSystem
{
    public function paginateCategories(int $perPage = 10): LengthAwarePaginator
    {
        return Category::query()
            ->with('parent:id,name')
            ->select('id', 'parent_id', 'name', 'slug', 'status')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function createCategory(string $name, ?int $parentId = null, CategoryStatus|int|null $status = null): Category
    {
        $name = $this->normalizeName($name);
        $this->checkNameNotEmpty($name);

        $this->checkParentExists($parentId);

        $status = CategoryStatus::normalizeFrom($status);

        $this->checkNameUnique($name);

        return Category::create([
            'name' => $name,
            'parent_id' => $parentId,
            'status' => $status
        ]);
    }

    public function showCategory(int $id): Category
    {
        return Category::query()->with('parent:id,name')->findOrFail($id);
    }

    public function updateCategory(int $id, string $name, ?int $parentId = null, CategoryStatus|int|null $status = null): Category
    {
        /** @var Category $category */
        $category = Category::query()->findOrFail($id);

        $name = $this->normalizeName($name);
        $this->checkNameNotEmpty($name);

        $this->checkParentExists($parentId);

        $status = CategoryStatus::normalizeFrom($status);

        if ($category->name === $name && $category->parent_id === $parentId && $category->status === $status) {
            return $category;
        }

        $this->checkNameUnique($name, $category->id);

        $category->update([
            'name' => $name,
            'parent_id' => $parentId,
            'status' => $status
        ]);

        return $category;
    }

    public function deleteCategory(int $id): void
    {
        /** @var Category $category */
        $category = Category::query()->findOrFail($id);

        if ($category->children()->exists()) {
            throw new LogicException('Unable to delete category due to the presence of subcategories!');
        }

        $category->delete();
    }

    private function normalizeName(string $name): string
    {
        return trim($name);
    }

    private function checkNameNotEmpty(string $name): void
    {
        if ($name === '') {
            throw new InvalidArgumentException('The category field cannot be empty.
            Please provide correct category name.');
        }
    }

    private function checkNameUnique(string $name, ?int $ignoreId = null): void
    {
        $categoryName = Category::query()->where('name', $name);

        if ($ignoreId !== null) {
            $categoryName->whereKeyNot($ignoreId);
        }

        if ($categoryName->exists()) {
            throw new LogicException('The category name "' . $name . '" already exists.');
        }
    }

    private function checkParentExists(?int $parentId): void
    {
        if ($parentId !== null && !Category::query()->whereKey($parentId)->exists()) {
            throw new LogicException('Parent category not found.');
        }
    }
}
