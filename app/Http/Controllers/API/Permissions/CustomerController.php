<?php

namespace App\Http\Controllers\API\Permissions;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('customer');

        return response()->json(['success' => true]);
    }
}
