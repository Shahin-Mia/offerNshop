<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use OpenApi\Attributes as OA;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
            path: '/api/roles',
            summary: 'List all roles',
            tags: ['Role'],
            security: [['bearerAuth' => []]],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'List of roles',
                    content: new OA\JsonContent(
                        type: 'array',
                        items: new OA\Items(
                            properties: [
                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                new OA\Property(property: 'name', type: 'string', example: 'admin'),
                                new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                                new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                                new OA\Property(property: 'updated_at', type: 'string', format: 'date-time'),
                                new OA\Property(
                                    property: 'permissions',
                                    type: 'array',
                                    items: new OA\Items(
                                        properties: [
                                            new OA\Property(property: 'id', type: 'integer', example: 1),
                                            new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                                            new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                                        ]
                                    )
                                )
                            ]
                        )
                    )
                ),
                new OA\Response(response: 401, description: 'Unauthenticated')
            ]
        )]
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[OA\Post(
            path: '/api/roles',
            summary: 'Create a new role',
            tags: ['Role'],
            security: [['bearerAuth' => []]],
            requestBody: new OA\RequestBody(
                required: true,
                content: new OA\JsonContent(
                    required: ['name'],
                    properties: [
                        new OA\Property(property: 'name', type: 'string', example: 'editor'),
                        new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                    ]
                )
            ),
            responses: [
                new OA\Response(
                    response: 201,
                    description: 'Role created successfully',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'id', type: 'integer', example: 1),
                            new OA\Property(property: 'name', type: 'string', example: 'editor'),
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
            'name' => 'required|string|unique:roles,name',
            'guard_name' => 'nullable|string',
        ]);

        $role = Role::create([
            'name' => $request->name,
            'guard_name' => $request->guard_name ?? 'api',
        ]);

        return response()->json($role, 201);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
            path: '/api/roles/{id}',
            summary: 'Get role details',
            tags: ['Role'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Role ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Role details',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'id', type: 'integer', example: 1),
                            new OA\Property(property: 'name', type: 'string', example: 'admin'),
                            new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                            new OA\Property(
                                property: 'permissions',
                                type: 'array',
                                items: new OA\Items(
                                    properties: [
                                        new OA\Property(property: 'id', type: 'integer', example: 1),
                                        new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                                    ]
                                )
                            )
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Role not found')
            ]
        )]
    public function show(string $id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return response()->json($role);
    }

    /**
     * Update the specified resource in storage.
     */
    #[OA\Put(
            path: '/api/roles/{id}',
            summary: 'Update role',
            tags: ['Role'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Role ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            requestBody: new OA\RequestBody(
                required: true,
                content: new OA\JsonContent(
                    required: ['name'],
                    properties: [
                        new OA\Property(property: 'name', type: 'string', example: 'super-admin'),
                    ]
                )
            ),
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Role updated',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'id', type: 'integer', example: 1),
                            new OA\Property(property: 'name', type: 'string', example: 'super-admin'),
                            new OA\Property(property: 'guard_name', type: 'string', example: 'api'),
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Role not found')
            ]
        )]
    public function update(Request $request, string $id)
    {
        $role = Role::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id,
        ]);

        $role->update(['name' => $request->name]);

        return response()->json($role);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(
            path: '/api/roles/{id}',
            summary: 'Delete role',
            tags: ['Role'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Role ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Role deleted',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'message', type: 'string', example: 'Role deleted successfully')
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Role not found')
            ]
        )]
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json(['message' => 'Role deleted successfully']);
    }

    /**
     * Assign permissions to the role.
     */
    #[OA\Post(
            path: '/api/roles/{id}/permissions',
            summary: 'Assign permissions to role',
            tags: ['Role'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'Role ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            requestBody: new OA\RequestBody(
                required: true,
                content: new OA\JsonContent(
                    required: ['permissions'],
                    properties: [
                        new OA\Property(
                            property: 'permissions',
                            type: 'array',
                            items: new OA\Items(type: 'string', example: 'edit articles')
                        )
                    ]
                )
            ),
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Permissions assigned',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'message', type: 'string', example: 'Permissions assigned successfully'),
                            new OA\Property(
                                property: 'role',
                                type: 'object',
                                properties: [
                                    new OA\Property(property: 'id', type: 'integer', example: 1),
                                    new OA\Property(property: 'name', type: 'string', example: 'admin'),
                                    new OA\Property(
                                        property: 'permissions',
                                        type: 'array',
                                        items: new OA\Items(
                                            properties: [
                                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                                new OA\Property(property: 'name', type: 'string', example: 'edit articles'),
                                            ]
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'Role not found')
            ]
        )]
    public function assignPermissions(Request $request, string $id)
    {
        $role = Role::findOrFail($id);

        $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role->syncPermissions($request->permissions);

        return response()->json([
            'message' => 'Permissions assigned successfully',
            'role' => $role->load('permissions')
        ]);
    }
}
