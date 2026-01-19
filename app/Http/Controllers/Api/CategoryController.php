<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Categories', description: 'Admin Category Management')]
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(path: '/api/categories', summary: 'List all categories', tags: ['Categories'], responses: [new OA\Response(response: 200, description: 'List of categories')])]
    public function index()
    {
        // Return tree structure or flat list? 
        // For admin management, a flat list with parent info is often easier, 
        // but let's return all for now.
        return Category::with('parent')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OA\Post(path: '/api/categories', summary: 'Create a new category', tags: ['Categories'], responses: [new OA\Response(response: 201, description: 'Category created')])]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string' // Assuming string URL for now, file upload is separate
        ]);

        $category = Category::create($validated);

        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(path: '/api/categories/{category}', summary: 'Get category details', tags: ['Categories'], responses: [new OA\Response(response: 200, description: 'Category details')])]
    public function show(Category $category)
    {
        return $category->load('children');
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(path: '/api/categories/{category}', summary: 'Update a category', tags: ['Categories'], responses: [new OA\Response(response: 200, description: 'Category updated')])]
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:categories,slug,' . $category->id,
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string'
        ]);

        $category->update($validated);

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(path: '/api/categories/{category}', summary: 'Delete a category', tags: ['Categories'], responses: [new OA\Response(response: 204, description: 'Category deleted')])]
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->noContent();
    }
}
