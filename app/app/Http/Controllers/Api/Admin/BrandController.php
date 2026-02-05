<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brand\StoreBrandRequest;
use App\Http\Requests\Admin\Brand\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $brands = Brand::query()
            ->select('id', 'name', 'slug')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Brands list',
            'data' => BrandResource::collection($brands),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request): JsonResponse
    {
        $brand = Brand::create([
            'name' => $request->getName()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Brand created',
            'data' => new BrandResource($brand),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Brand details',
            'data' => new BrandResource($brand),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand): JsonResponse
    {
        $brand->update([
            'name' => $request->getName()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Brand updated',
            'data' => new BrandResource($brand),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand): JsonResponse
    {
        $brand->delete();

        return response()->json([
            'success' => true,
            'message' => 'Brand deleted',
            'data' => null,
        ]);
    }
}
