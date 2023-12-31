<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Random\RandomException;

class OrderProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @throws RandomException
     */
    public function run()
    {
        // Assuming you have 10 orders and 20 products
        for ($i = 1; $i <= 10; $i++) {
            for ($j = 1; $j <= 20; $j++) {
                DB::table('order_product')->insert([
                    'order_id' => $i,
                    'product_id' => $j,
                    'quantity' => random_int(1, 5), // Assuming a quantity between 1 and 5
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
