<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enum\Admin\CategoryStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\StoreCategoryRequest;
use App\Http\Requests\Admin\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categories = Category::query()
            ->with('parent:id,name')
            ->select('id', 'parent_id', 'name', 'slug', 'status')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json([
            'data' => CategoryResource::collection($categories)->response()->getData(true),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create([
            'parent_id' => $request->getParentID(),
            'name' => $request->getName(),
            'status' => $request->getStatus() ?? CategoryStatus::ACTIVE,
        ]);

        return response()->json([
            'data' => new CategoryResource($category)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): JsonResponse
    {
        $category->load('parent:id,name');

        return response()->json([
            'data' => new CategoryResource($category)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $data = [
            'parent_id' => $request->getParentID(),
            'name'      => $request->getName(),
        ];

        if (!is_null($request->getStatus())) {
            $data['status'] = $request->getStatus();
        }

        $category->update($data);

        return response()->json([
            'data' => new CategoryResource($category),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        if ($category->children()->exists()) {
            return response()->json([
                'message' => 'Unable to delete category due to the presence of subcategories!',
            ], 422);
        }

        $category->delete();
        return response()->json([
            'data' => null
        ]);
    }
}





