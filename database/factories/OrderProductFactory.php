<?php

namespace Database\Factories;

use App\Models\OrderProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderProduct>
 */
class OrderProductFactory extends Factory
{
    protected $model = \App\Models\OrderProduct::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'order_id' => $this->faker->numberBetween(1, 10),
            'product_id' => $this->faker->numberBetween(1, 20),
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }
}
