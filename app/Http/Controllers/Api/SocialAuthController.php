<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use OpenApi\Attributes as OA;

class SocialAuthController extends Controller
{
    #[OA\Post(
        path: '/api/social-login',
        summary: 'Social media login',
        description: 'Authenticate user via social media provider (Google or Facebook)',
        tags: ['Social Authentication'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['provider', 'provider_id', 'name', 'email'],
                properties: [
                    new OA\Property(property: 'provider', type: 'string', enum: ['google', 'facebook'], example: 'google'),
                    new OA\Property(property: 'provider_id', type: 'string', example: '1234567890'),
                    new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                    new OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com'),
                    new OA\Property(property: 'avatar', type: 'string', nullable: true, example: 'https://example.com/avatar.jpg'),
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Social login successful',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Social login successful'),
                        new OA\Property(
                            property: 'user',
                            type: 'object',
                            properties: [
                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                new OA\Property(property: 'name', type: 'string', example: 'John Doe'),
                                new OA\Property(property: 'email', type: 'string', example: 'john@example.com'),
                                new OA\Property(property: 'avatar', type: 'string', example: 'https://example.com/avatar.jpg'),
                                new OA\Property(
                                    property: 'role',
                                    type: 'object',
                                    properties: [
                                        new OA\Property(property: 'id', type: 'integer', example: 2),
                                        new OA\Property(property: 'name', type: 'string', example: 'user'),
                                        new OA\Property(property: 'description', type: 'string', example: 'Regular user with limited access'),
                                    ]
                                ),
                            ]
                        ),
                        new OA\Property(property: 'token', type: 'string', example: '3|ghi789rst...'),
                    ]
                )
            ),
            new OA\Response(
                response: 422,
                description: 'Validation error',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'The provider field is required.'),
                        new OA\Property(
                            property: 'errors',
                            type: 'object'
                        ),
                    ]
                )
            ),
        ]
    )]
    public function socialLogin(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'provider' => ['required', 'string', 'in:google,facebook'],
            'provider_id' => ['required', 'string'],
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'avatar' => ['nullable', 'string'],
        ]);

        // Check if social account exists
        $socialAccount = SocialAccount::where('provider', $validated['provider'])
            ->where('provider_id', $validated['provider_id'])
            ->first();

        if ($socialAccount) {
            // User exists, log them in
            $user = $socialAccount->user;

            // Update avatar if provided
            if (isset($validated['avatar']) && $validated['avatar']) {
                $user->update(['avatar' => $validated['avatar']]);
            }
        } else {
            // Check if user exists with this email
            $user = User::where('email', $validated['email'])->first();

            if (!$user) {
                // Create new user
                $userRole = Role::where('name', Role::USER)->first();

                $user = User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => Hash::make(Str::random(32)), // Random password
                    'role_id' => $userRole->id,
                    'avatar' => $validated['avatar'] ?? null,
                ]);
            }

            // Create social account link
            SocialAccount::create([
                'user_id' => $user->id,
                'provider' => $validated['provider'],
                'provider_id' => $validated['provider_id'],
                'avatar' => $validated['avatar'] ?? null,
            ]);
        }

        // Revoke previous tokens
        $user->tokens()->delete();

        // Create new token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Social login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'role' => $user->role,
            ],
            'token' => $token,
        ]);
    }
}
