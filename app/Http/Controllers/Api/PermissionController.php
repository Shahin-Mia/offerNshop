<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use OpenApi\Attributes as OA;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
            path: '/api/permissions',
            summary: 'List all permissions',
            tags: ['Permission'],
            security: [['bearerAuth' => []]],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'List of permissions',
                    content: new OA\JsonContent(
                        type: 'array',
                        items: new OA\Items(
                            properties: [
                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                                new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                                new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                                new OA\Property(property: 'updated_at', type: 'string', format: 'date-time'),
                            ]
                        )
                    )
                ),
                new OA\Response(response: 401, description: 'Unauthenticated')
            ]
        )]
    public function index()
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OA\Post(
            path: '/api/permissions',
            summary: 'Create a new permission',
            tags: ['Permission'],
            security: [['bearerAuth' => []]],
            requestBody: new OA\RequestBody(
                required: true,
                content: new OA\JsonContent(
                    required: ['name'],
                    properties: [
                        new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                        new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                    ]
                )
            ),
            responses: [
                new OA\Response(
                    response: 201,
                    description: 'Permission created successfully',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'id', type: 'integer', example: 1),
                            new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                            new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                            new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                            new OA\Property(property: 'updated_at', type: 'string', format: 'date-time'),
                        ]
                    )
                ),
                new OA\Response(response: 401, description: 'Unauthenticated'),
                new OA\Response(response: 422, description: 'Validation Error')
            ]
        )]
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
            'guard_name' => 'nullable|string',
        ]);

        $permission = Permission::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name ?? 'api',
        ]);

        return response()->json($permission, 201);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
            path: '/api/permissions/{id}',
            summary: 'Get permission details',
            tags: ['Permission'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Permission ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Permission details',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'id', type: 'integer', example: 1),
                            new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                            new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Permission not found')
            ]
        )]
    public function show(string $id)
    {
        $permission = Permission::findOrFail($id);
        return response()->json($permission);
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(
            path: '/api/permissions/{id}',
            summary: 'Update permission',
            tags: ['Permission'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Permission ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            requestBody: new OA\RequestBody(
                required: true,
                content: new OA\JsonContent(
                    required: ['name'],
                    properties: [
                        new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                    ]
                )
            ),
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Permission updated',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'id', type: 'integer', example: 1),
                            new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                            new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Permission not found')
            ]
        )]
    public function update(Request $request, string $id)
    {
        $permission = Permission::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update(['name' => $request->name]);

        return response()->json($permission);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(
            path: '/api/permissions/{id}',
            summary: 'Delete permission',
            tags: ['Permission'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Permission ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Permission deleted',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'message', type: 'string', example: 'Permission deleted successfully')
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Permission not found')
            ]
        )]
    public function destroy(string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully']);
    }
}
