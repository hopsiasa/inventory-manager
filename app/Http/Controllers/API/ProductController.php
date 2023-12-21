<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 25);
        $products = Product::query()->orderBy('id', 'desc')->paginate($perPage);

        $data = [
            'data' => ProductResource::collection($products),
            'pagination' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
            ],
        ];

        return response()->json($data);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|between:0,1000',
                'quantity' => 'required|numeric|between:0,100',
                'description' => 'string|max:500',
                'category_id' => 'exists:categories,id',
            ]);
            $validatedData['user_id'] = auth()->id();

            $products = Product::create($validatedData);
            return new ProductResource($products);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the product.'], 400);
        }
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|between:0,1000',
                'quantity' => 'required|numeric|between:0,100',
                'description' => 'string|max:500',
                'category_id' => 'exists:categories,id',
            ]);
            $validatedData['user_id'] = auth()->id();

            $product->update($validatedData);
            return new ProductResource($product);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the product.'], 400);
        }
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json([
            "success" => true,
            "message" => "Product deleted successfully.",
            "data" => $product
        ]);
    }
}
