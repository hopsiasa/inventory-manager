<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 25);
        $categories = Category::query()->orderBy('id', 'desc')->paginate($perPage);

        $data = [
            'data' => CategoryResource::collection($categories),
            'pagination' => [
                'total' => $categories->total(),
                'per_page' => $categories->perPage(),
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
            ],
        ];

        return response()->json($data);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'string|max:500',
            ]);

            $category = Category::create($validatedData);
            return new CategoryResource($category);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the category.'], 400);
        }
    }

    public function show(Category $category): CategoryResource
    {
        return new CategoryResource($category);
    }

    public function update(Request $request, Category $category)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'string|max:500',
            ]);

            $category->update($validatedData);
            return new CategoryResource($category);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the category.'], 400);
        }
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return response()->json([
            "success" => true,
            "message" => "Category deleted successfully.",
            "data" => $category
        ]);
    }
}
