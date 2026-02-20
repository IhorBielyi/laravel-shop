<?php

namespace App\Http\Controllers\Api\Admin;

use AllowDynamicProperties;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\StoreCategoryRequest;
use App\Http\Requests\Admin\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\Category\CategoryManagementSystem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

#[AllowDynamicProperties] class CategoryController extends Controller
{
    public function __construct(CategoryManagementSystem $categoryManagementSystem)
    {
        $this->categoryManagementSystem = $categoryManagementSystem;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->integer('per_page', 10);

        $categories = $this->categoryManagementSystem->paginateCategories($perPage);

        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): CategoryResource
    {
        $category = $this->categoryManagementSystem->createCategory(
            $request->getName(),
            $request->getParentID(),
            $request->getStatus()
        );

        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): CategoryResource
    {
        $category = $this->categoryManagementSystem->showCategory($id);

        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id, UpdateCategoryRequest $request): CategoryResource
    {
        $category = $this->categoryManagementSystem->updateCategory(
            $id,
            $request->getName(),
            $request->getParentID(),
            $request->getStatus());

        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): Response
    {
        $this->categoryManagementSystem->deleteCategory($id);

        return response()->noContent();
    }

    public function statuses(): JsonResponse
    {
        return response()->json(
            $this->categoryManagementSystem->getStatuses()
        );
    }
}





