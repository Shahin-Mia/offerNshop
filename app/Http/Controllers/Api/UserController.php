<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use OpenApi\Attributes as OA;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
            path: '/api/users',
            summary: 'List all users with roles',
            tags: ['User'],
            security: [['bearerAuth' => []]],
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'List of users',
                    content: new OA\JsonContent(
                        type: 'array',
                        items: new OA\Items(
                            properties: [
                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                                new OA\Property(property: 'email', type: 'string', example: 'john@example.com'),
                                new OA\Property(
                                    property: 'roles',
                                    type: 'array',
                                    items: new OA\Items(
                                        properties: [
                                            new OA\Property(property: 'id', type: 'integer', example: 1),
                                            new OA\Property(property: 'name', type: 'string', example: 'admin'),
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
        $users = User::with('roles')->get();
        return response()->json($users);
    }

    /**
     * Assign role to user.
     */
    #[OA\Post(
            path: '/api/users/{id}/assign-role',
            summary: 'Assign role to user',
            tags: ['User'],
            security: [['bearerAuth' => []]],
            parameters: [
                new OA\Parameter(
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'User ID',
                    schema: new OA\Schema(type: 'string')
                )
            ],
            requestBody: new OA\RequestBody(
                required: true,
                content: new OA\JsonContent(
                    required: ['role'],
                    properties: [
                        new OA\Property(property: 'role', type: 'string', example: 'editor'),
                    ]
                )
            ),
            responses: [
                new OA\Response(
                    response: 200,
                    description: 'Role assigned',
                    content: new OA\JsonContent(
                        properties: [
                            new OA\Property(property: 'message', type: 'string', example: 'Role assigned successfully'),
                            new OA\Property(
                                property: 'user',
                                type: 'object',
                                properties: [
                                    new OA\Property(property: 'id', type: 'integer', example: 1),
                                    new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                                    new OA\Property(
                                        property: 'roles',
                                        type: 'array',
                                        items: new OA\Items(
                                            properties: [
                                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                                new OA\Property(property: 'name', type: 'string', example: 'editor'),
                                            ]
                                        )
                                    )
                                ]
                            )
                        ]
                    )
                ),
                new OA\Response(response: 404, description: 'User or Role not found')
            ]
        )]
    public function assignRole(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $user->syncRoles($request->role);

        return response()->json([
            'message' => 'Role assigned successfully',
            'user' => $user->load('roles')
        ]);
    }
}
