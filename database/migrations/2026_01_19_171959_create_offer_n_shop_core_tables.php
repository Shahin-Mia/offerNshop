<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('categories')->onDelete('cascade');
        });

        // 2. Shops
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();

            // Location Data
            $table->decimal('latitude', 10, 8)->nullable()->index();
            $table->decimal('longitude', 11, 8)->nullable()->index();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();

            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('owner_id')->nullable(); // For future if shops have specific user owners
            $table->timestamps();

            // Index for simpler bounding box queries (though MySQL 8+ handles spatial better, this is safe start)
            $table->index(['latitude', 'longitude']);
        });

        // 3. Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade'); // Product belongs to a shop
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');

            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });

        // 4. Offers
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained()->onDelete('cascade'); // Optional: Offer might be general

            $table->string('title');
            $table->decimal('discount_percentage', 5, 2)->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date');

            $table->timestamps();
        });

        // 5. Flyers
        Schema::create('flyers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');

            $table->string('image_url');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flyers');
        Schema::dropIfExists('offers');
        Schema::dropIfExists('products');
        Schema::dropIfExists('shops');
        Schema::dropIfExists('categories');
    }
};
