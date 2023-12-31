<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoleController
{
    public function index(): JsonResponse
    {
        return response()->json(RoleResource::collection(Role::all()));
    }
}
