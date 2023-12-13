<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        //        if ($request->user()->cannot('admin')) {
        //            abort(403, 'Unauthorized');
        //        }

        $perPage = $request->input('per_page', 10);
        $users = User::query()->orderBy('id', 'desc')->paginate($perPage);

        $data = [
            'data' => UserResource::collection($users),
            'pagination' => [
                'total' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
            ],
        ];

        return response()->json($data);

        // return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate());
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $user->assignRole($request->input('role'));

        return response(new UserResource($user), 201);
    }

    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        $user->syncRoles($request->input('role'));

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response('', 204);
    }
}
