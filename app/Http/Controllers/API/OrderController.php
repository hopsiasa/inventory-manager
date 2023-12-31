<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 25);
        $orders = Order::query()->orderBy('id', 'desc')->paginate($perPage);

        $data = [
            'data' => OrderResource::collection($orders),
            'pagination' => [
                'total' => $orders->total(),
                'per_page' => $orders->perPage(),
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
            ],
        ];

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'customer' => 'required|string|max:255',
                'quantity' => 'required|numeric|between:0,100',
                'total' => 'required|numeric|decimal:2',
                'paid' => 'required|numeric|decimal:2',
                'remaining_amount' => 'numeric|decimal:2',
                'description' => 'string|max:500',
            ]);

            $orders = Order::create($validatedData);
            $orders->order_id = strtoupper(substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, 8));

            return new OrderResource($orders);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the order.'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): OrderResource
    {
        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        try {
            $validatedData = $request->validate([
                'customer' => 'required|string|max:255',
                'quantity' => 'required|numeric|between:0,100',
                'total' => 'required|numeric|decimal:2',
                'paid' => 'required|numeric|decimal:2',
                'remaining_amount' => 'numeric|decimal:2',
                'description' => 'string|max:500',
            ]);

            $order->update($validatedData);

            return new OrderResource($order);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the order.'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order): JsonResponse
    {
        $order->delete();

        return response()->json([
            "success" => true,
            "message" => "Order deleted successfully.",
            "data" => $order
        ]);
    }
}
