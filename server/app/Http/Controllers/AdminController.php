<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|min:6',
            'phone' => 'required|string',
        ]);

        $admin = Admin::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'profile_image' => $request->profile_image ?? null,
        ]);

        return response()->json(['message' => 'Admin registered successfully.', 'admin' => $admin]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $admin = Admin::where('email', $credentials['email'])->first();
    
        if (!$admin || !Hash::check($credentials['password'], $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        $token = $admin->createToken('admin-token')->plainTextToken;
    
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'admin' =>$admin
        ]);
    }
    

    public function getAdminByToken(Request $request)
    {
        return response()->json(['admin' => $request->user()]);
    }

    public function getAdmins()
    {
        $admins = Admin::all();
        return response()->json(['admins' => $admins]);
    }

    public function getAdmin($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json(['admin' => $admin]);
    }

    public function updateAdmin(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $validated = $request->validate([
            'username' => 'nullable|string',
            'email' => 'nullable|email|unique:admins,email,' . $id,
            'password' => 'nullable|min:6',
            'phone' => 'nullable|string',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $admin->update($validated);

        return response()->json(['message' => 'Admin updated successfully.', 'admin' => $admin]);
    }

    public function deleteAdmin($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully.']);
    }


    public function updatePassword(Request $request)
{
    $request->validate([
        'old_password' => 'required',
        'new_password' => 'required|min:8|confirmed', 
    ]);

    $admin = auth()->user(); 

    if (!Hash::check($request->old_password, $admin->password)) {
        return response()->json(['message' => 'Old password is incorrect'], 400);
    }

    $admin->password = Hash::make($request->new_password);
    $admin->save();

    return response()->json(['message' => 'Password updated successfully']);
}

}
