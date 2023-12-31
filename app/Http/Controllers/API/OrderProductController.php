<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderProductResource;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderProductController extends Controller
{
    public function show(Request $request, $order_id): JsonResponse
    {
        $perPage = $request->input('per_page', 25);
        $orderProducts = OrderProduct::where('order_id', $order_id)->orderBy('id','desc')->paginate($perPage);

        $data = [
            'data' => OrderProductResource::collection($orderProducts),
            'pagination' => [
                'total' => $orderProducts->total(),
                'per_page' => $orderProducts->perPage(),
                'current_page' => $orderProducts->currentPage(),
                'last_page' => $orderProducts->lastPage(),
            ],
        ];

        return response()->json($data);
    }
}

