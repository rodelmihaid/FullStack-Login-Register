<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);
        return $user;
    }

    public function login(Request $request){
        // Auth::attempt([
        //     'email' => $request->input('email'),
        //     'password' => $request->input('password')
        // ]); SAU

       if( ! Auth::attempt($request->only('email','password'))) {
        return response([
            'message'=>'Invalid credentials'
        ],Response::HTTP_UNAUTHORIZED);
       }

       $user=Auth::user();
       $token = $user->createToken('token')->plainTextToken;

       $cookie= cookie('jwt',$token,60*24);//1 day

       return response([
        'message'=>$token
       ])->withCookie($cookie);
    }

    public function user()
    {
        return  Auth::user();
    }


    public function logout(){
        $cookie=Cookie::forget('jwt');

        return response([
            'message'=>'success'
        ])->withCookie($cookie);
    }
}
