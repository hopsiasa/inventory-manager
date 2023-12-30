<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => fake()->numberBetween(1,50),
            'customer' => fake()->name(),
            'quantity' => fake()->numberBetween(1,20),
            'status' => fake()->numberBetween(1,3),
            'total' => fake()->randomFloat(1, 1, 1000),
            'paid' => fake()->randomFloat(1, 1, 1000),
            'remaining_amount' => fake()->randomFloat(1, 1, 1000),
            'description' => fake()->text(100),
            'user_id' => fake()->numberBetween(1,10),
        ];
    }
}
