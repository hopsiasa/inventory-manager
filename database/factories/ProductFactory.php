<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'price' => fake()->randomFloat(1, 1, 1000),
            'category_id' => fake()->numberBetween(1,10),
            'user_id' => fake()->numberBetween(1,10),
            'quantity' => fake()->numberBetween(1,20),
            'description' => fake()->text(100),
        ];
    }
}
