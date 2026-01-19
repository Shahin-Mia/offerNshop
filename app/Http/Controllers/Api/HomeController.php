<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\Product;
use App\Services\LocationService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class HomeController extends Controller
{
    #[OA\Get(
        path: '/api/home',
        summary: 'Get Home Feed (Nearby Shops)',
        description: 'Returns a list of shops within 10km radius of the provided latitude/longitude.',
        tags: ['User App'],
        parameters: [
            new OA\Parameter(name: 'latitude', in: 'query', required: true, schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'longitude', in: 'query', required: true, schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'radius', in: 'query', required: false, schema: new OA\Schema(type: 'integer', default: 10)),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful operation',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'shops', type: 'array', items: new OA\Items(
                            properties: [
                                new OA\Property(property: 'id', type: 'integer'),
                                new OA\Property(property: 'name', type: 'string'),
                                new OA\Property(property: 'distance', type: 'number'),
                            ]
                        )),
                        new OA\Property(property: 'featured_products', type: 'array', items: new OA\Items(type: 'object'))
                    ]
                )
            ),
            new OA\Response(response: 422, description: 'Validation Error')
        ]
    )]
    public function index(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius' => 'nullable|integer|max:50'
        ]);

        $lat = $request->input('latitude');
        $lng = $request->input('longitude');
        $radius = $request->input('radius', 10);

        // Use the LocationService to scope the query
        $shops = LocationService::scopeNearby(Shop::query(), $lat, $lng, $radius)
            ->where('is_active', true)
            ->take(20)
            ->get();

        // Get some random featured products for now (or algorithms later)
        $featuredProducts = Product::with('shop')
            ->where('is_active', true)
            ->inRandomOrder()
            ->take(10)
            ->get();

        return response()->json([
            'shops' => $shops,
            'featured_products' => $featuredProducts
        ]);
    }

    #[OA\Get(
        path: '/api/search',
        summary: 'Search Products',
        tags: ['User App'],
        parameters: [
            new OA\Parameter(name: 'query', in: 'query', required: true, schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'latitude', in: 'query', required: false, schema: new OA\Schema(type: 'number')),
            new OA\Parameter(name: 'longitude', in: 'query', required: false, schema: new OA\Schema(type: 'number')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Search results')
        ]
    )]
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2',
        ]);

        $search = $request->input('query');

        $products = Product::with('shop')
            ->where('name', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->where('is_active', true)
            ->paginate(20);

        return response()->json($products);
    }
}
