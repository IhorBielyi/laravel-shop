<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brand\StoreBrandRequest;
use App\Http\Requests\Admin\Brand\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Services\Brands\BrandCreator;
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
            'data' => BrandResource::collection($brands)->response()->getData(true),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request, BrandCreator $brandCreator): JsonResponse
    {
        $brand = $brandCreator->create($request->getName());

        return response()->json([
            'data' => new BrandResource($brand),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand): JsonResponse
    {
        return response()->json([
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
            'data' => null,
        ]);
    }
}
