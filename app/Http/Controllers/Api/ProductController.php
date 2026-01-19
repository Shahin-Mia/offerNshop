<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Products', description: 'Admin Product Management')]
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(path: '/api/products', summary: 'List products with pagination', tags: ['Products'], responses: [new OA\Response(response: 200, description: 'Paginated list of products')])]
    public function index(Request $request)
    {
        $query = Product::with(['shop', 'category']);

        // Filter by Shop
        if ($request->has('shop_id')) {
            $query->where('shop_id', $request->shop_id);
        }

        // Filter by Category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        return $query->paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OA\Post(path: '/api/products', summary: 'Create a new product', tags: ['Products'], responses: [new OA\Response(response: 201, description: 'Product created')])]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shop_id' => 'required|exists:shops,id',
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $product = Product::create($validated);

        return response()->json($product, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(path: '/api/products/{product}', summary: 'Get product details', tags: ['Products'], responses: [new OA\Response(response: 200, description: 'Product details')])]
    public function show(Product $product)
    {
        return $product->load(['shop', 'category', 'offers']);
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(path: '/api/products/{product}', summary: 'Update a product', tags: ['Products'], responses: [new OA\Response(response: 200, description: 'Product updated')])]
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'shop_id' => 'sometimes|exists:shops,id',
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(path: '/api/products/{product}', summary: 'Delete a product', tags: ['Products'], responses: [new OA\Response(response: 204, description: 'Product deleted')])]
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
