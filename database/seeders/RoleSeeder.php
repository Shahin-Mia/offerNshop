<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure we are using the correct guard (usually 'web' or 'api')
        $roles = [
            Role::ADMIN,
            Role::USER,
        ];

        foreach ($roles as $roleName) {
            // Spatie roles are unique by name AND guard_name
            Role::firstOrCreate([
                'name' => $roleName,
                'guard_name' => 'web'
            ]);
        }
    }
}