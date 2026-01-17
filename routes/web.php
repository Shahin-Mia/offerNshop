<?php

use App\Http\Controllers\Auth\WebAuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Home page (public)
// Root URL redirect
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

// Guest routes (only accessible when not authenticated)
Route::middleware('guest')->group(function () {
    Route::get('/login', [WebAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [WebAuthController::class, 'login']);

    Route::get('/register', [WebAuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [WebAuthController::class, 'register']);

    // Social login routes
    Route::get('/auth/{provider}/redirect', [WebAuthController::class, 'redirectToProvider'])
        ->name('social.redirect');
    Route::get('/auth/{provider}/callback', [WebAuthController::class, 'handleProviderCallback'])
        ->name('social.callback');
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [WebAuthController::class, 'logout'])->name('logout');

    // User dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // User profile
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
});

// Admin routes (requires admin role)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    })->name('users');

    Route::get('/shops', function () {
        return Inertia::render('Admin/Shops');
    })->name('shops');

    Route::get('/products', function () {
        return Inertia::render('Admin/Products');
    })->name('products');

    Route::get('/offers', function () {
        return Inertia::render('Admin/Offers');
    })->name('offers');

    Route::get('/categories', function () {
        return Inertia::render('Admin/Categories');
    })->name('categories');

    Route::get('/notifications', function () {
        return Inertia::render('Admin/Notifications');
    })->name('notifications');

    Route::get('/reports', function () {
        return Inertia::render('Admin/Reports');
    })->name('reports');

    Route::get('/content', function () {
        return Inertia::render('Admin/Content');
    })->name('content');

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('settings');
});
