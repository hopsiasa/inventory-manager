<?php

namespace App\Http\Controllers\API\Permissions;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ManagerController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('manager');

        return response()->json(['success' => true]);
    }
}
