<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function __construct()
    {
        # By default we are using here auth:api middleware
        $this->middleware('auth:api', ['except' => ['login']]);
    }

//    public function signup(SignupRequest $request)
//    {
//        $request->validate([
//            'name' => ['required', 'string', 'max:255'],
//            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
//            'password' => ['required', 'confirmed', Password::defaults()],
//        ]);
//
//        /** @var User */
//        $user = User::create([
//            'name' => $request->name,
//            'email' => $request->email,
//            'password' => Hash::make($request->password),
//        ]);
//
//        return response()->json([
//            'access_token' => $user->createToken('client')->plainTextToken,
//        ]);
//    }

//    public function login(LoginRequest $request)
//    {
//        $credentials = $request->validated();
//
//        if (!Auth::attempt($credentials)) {
//            return response([
//                'message' => 'Provided email or password is incorrect'
//            ], 422);
//        }
//
//        /** @var User $user */
//        $user = Auth::user();
//        $token = $user->createToken('main')->plainTextToken;
//
//        return response(compact('user', 'token'));
//    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token); # If all credentials are correct - we are going to generate a new access token and send it back on response
    }

//    public function user(): JsonResponse
//    {
//        return response()->json(new UserResource(auth()->user()), 200);
//    }

    public function me()
    {
        # Here we just get information about current user
        return response()->json(auth()->user());
    }

//    public function logout(Request $request)
//    {
//        /** @var User $user */
//        $user = $request->user();
//        $user->currentAccessToken()->delete();
//
//        return response('', 204);
//    }

    public function logout()
    {
        auth()->logout(); # This is just logout function that will destroy access token of current user

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        # When access token will be expired, we are going to generate a new one wit this function
        # and return it here in response
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        # This function is used to make JSON response with new
        # access token of current user
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
