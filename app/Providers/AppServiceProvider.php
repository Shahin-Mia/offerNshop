<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register authorization gates
        Gate::define('admin-access', function ($user) {
            return $user->isAdmin();
        });

        Gate::define('user-access', function ($user) {
            return $user->isUser() || $user->isAdmin();
        });
    }
}
