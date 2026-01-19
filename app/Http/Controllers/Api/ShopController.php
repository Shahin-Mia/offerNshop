<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Shops', description: 'Admin Shop Management')]
class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(path: '/api/shops', summary: 'List shops with pagination', tags: ['Shops'], responses: [new OA\Response(response: 200, description: 'Paginated list of shops')])]
    public function index(Request $request)
    {
        $query = Shop::with('owner');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        return $query->paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OA\Post(path: '/api/shops', summary: 'Create a new shop', tags: ['Shops'], responses: [new OA\Response(response: 201, description: 'Shop created')])]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'is_active' => 'boolean',
            'owner_id' => 'nullable|exists:users,id'
        ]);

        $shop = Shop::create($validated);

        return response()->json($shop, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(path: '/api/shops/{shop}', summary: 'Get shop details', tags: ['Shops'], responses: [new OA\Response(response: 200, description: 'Shop details')])]
    public function show(Shop $shop)
    {
        return $shop->load(['products', 'offers']);
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(path: '/api/shops/{shop}', summary: 'Update a shop', tags: ['Shops'], responses: [new OA\Response(response: 200, description: 'Shop updated')])]
    public function update(Request $request, Shop $shop)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'is_active' => 'boolean',
            'owner_id' => 'nullable|exists:users,id'
        ]);

        $shop->update($validated);

        return response()->json($shop);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(path: '/api/shops/{shop}', summary: 'Delete a shop', tags: ['Shops'], responses: [new OA\Response(response: 204, description: 'Shop deleted')])]
    public function destroy(Shop $shop)
    {
        $shop->delete();

        return response()->noContent();
    }
}
