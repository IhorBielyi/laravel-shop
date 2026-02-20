<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Brand\StoreBrandRequest;
use App\Http\Requests\Admin\Brand\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Services\Brands\BrandManagementSystem;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(BrandManagementSystem $brandManagementSystem): AnonymousResourceCollection
    {
        $brands = $brandManagementSystem->paginateBrands();

        return BrandResource::collection($brands);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request, BrandManagementSystem $brandManagementSystem): BrandResource
    {
        $brand = $brandManagementSystem->createBrand($request->getName());

       return new BrandResource($brand);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id, BrandManagementSystem $brandManagementSystem): BrandResource
    {
        $brand = $brandManagementSystem->showBrand($id);

        return new BrandResource($brand);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, int $id, BrandManagementSystem $brandManagementSystem): BrandResource
    {
        $brand = $brandManagementSystem->updateBrand($id, $request->getName());

        return new BrandResource($brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id, BrandManagementSystem $brandManagementSystem): Response
    {
        $brandManagementSystem->deleteBrand($id);

        return response()->noContent();
    }
}
