<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'product' => $this->product,
            'customer' => $this->customer,
            'quantity' => $this->quantity,
            'status' => $this->status,
            'total' => $this->total,
            'paid' => $this->paid,
            'remaining_amount' => $this->remaining_amount,
            'description' => $this->description,
            'user' => $this->user,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
