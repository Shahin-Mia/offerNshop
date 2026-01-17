<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    description: 'Authentication and Authorization API for OfferNShop application. Supports both web (Inertia.js/React) and mobile (Flutter) clients with role-based access control.',
    title: 'OfferNShop API Documentation',
    contact: new OA\Contact(email: 'support@offernshop.com')
)]
#[OA\Server(
    url: 'http://localhost:8000',
    description: 'Local Development Server'
)]
#[OA\Server(
    url: 'https://offernshop.weblioo.com',
    description: 'Production Server'
)]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    bearerFormat: 'Sanctum Token',
    description: 'Enter your Sanctum API token',
    scheme: 'bearer'
)]
#[OA\Tag(
    name: 'Authentication',
    description: 'API endpoints for user authentication'
)]
#[OA\Tag(
    name: 'Social Authentication',
    description: 'API endpoints for social media authentication'
)]
#[OA\Tag(
    name: 'User',
    description: 'API endpoints for user management'
)]
#[OA\Tag(
    name: 'Role',
    description: 'API endpoints for role management'
)]
#[OA\Tag(
    name: 'Permission',
    description: 'API endpoints for permission management'
)]
class OpenApiSpec
{
    // This class exists solely to hold OpenAPI global attributes
}
