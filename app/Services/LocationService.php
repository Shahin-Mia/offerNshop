<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class LocationService
{
    /**
     * Scope a query to only include records within a given radius (km) of a point.
     * Uses the Haversine formula.
     *
     * @param Builder $query Eloquent Builder instance
     * @param float $latitude User's latitude
     * @param float $longitude User's longitude
     * @param int $radius Radius in kilometers (default 10)
     * @return Builder
     */
    public static function scopeNearby(Builder $query, float $latitude, float $longitude, int $radius = 10): Builder
    {
        // 6371 = Earth's radius in km
        $haversine = "(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude))))";

        return $query
            ->select('*') // Select all columns from the model's table
            ->selectRaw("{$haversine} AS distance", [$latitude, $longitude, $latitude])
            ->whereRaw("{$haversine} < ?", [$latitude, $longitude, $latitude, $radius])
            ->orderBy('distance');
    }
}
