<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brand\StoreBrandRequest;
use App\Http\Requests\Admin\Brand\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Services\Brands\BrandManagementSystem;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(BrandManagementSystem $brandManagementSystem): JsonResponse
    {
        $brands = $brandManagementSystem->paginateBrands();

        return response()->json([
            'data' => BrandResource::collection($brands)->response()->getData(true),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request, BrandManagementSystem $brandManagementSystem): JsonResponse
    {
        $brand = $brandManagementSystem->createBrand($request->getName());

        return response()->json([
            'data' => new BrandResource($brand),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand, BrandManagementSystem $brandManagementSystem): JsonResponse
    {
        return response()->json([
            'data' => new BrandResource($brandManagementSystem->showBrand($brand)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, BrandManagementSystem $brandManagementSystem, Brand $brand): JsonResponse
    {
        $brand = $brandManagementSystem->updateBrand($brand, $request->getName());

        return response()->json([
            'data' => new BrandResource($brand),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BrandManagementSystem $brandManagementSystem, Brand $brand): JsonResponse
    {
        $brandManagementSystem->deleteBrand($brand);

        return response()->json([
            'data' => null,
        ]);
    }
}
