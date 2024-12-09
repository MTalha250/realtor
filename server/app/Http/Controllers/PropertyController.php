<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\PropertyLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    function transformPropertyResponse($property) {
        return [
            "id" => $property['id'],
            "title" => $property['title'],
            "description" => $property['description'],
            "bedrooms" => $property['bedrooms'],
            "bathrooms" => $property['bathrooms'],
            "area" => $property['area'],
            "leaseTerm" => $property['leaseTerm'],
            "propertyType" => $property['propertyType'],
            "category" => $property['category'],
            "dealType" => $property['dealType'],
            "floors" => $property['floors'],
            "noiseLevel" => $property['noiseLevel'],
            "laundry" => $property['laundry'],
            "internet" => $property['internet'],
            "condition" => $property['condition'],
            "video" => $property['video'],
            "price" => (float) $property['price'],
            "view" => is_array($property['view']) ? $property['view'] : [$property['view']],
            "outdoor" => is_array($property['outdoor']) ? $property['outdoor'] : [$property['outdoor']],
            "propertyStyle" => is_array($property['propertyStyle']) ? $property['propertyStyle'] : [$property['propertyStyle']],
            "securityFeatures" => is_array($property['securityFeatures']) ? $property['securityFeatures'] : [$property['securityFeatures']],
            "amenities" => is_array($property['amenities']) ? $property['amenities'] : [$property['amenities']],
            "heating" => is_array($property['heating']) ? $property['heating'] : [$property['heating']],
            "cooling" => is_array($property['cooling']) ? $property['cooling'] : [$property['cooling']],
            "priceType" => $property['priceType'],
            "views" => (int) $property['views'],
            "likes" => (int) $property['likes'],
            "created_at" => $property['created_at'],
            "updated_at" => $property['updated_at'],
            "images" => $property['images']->map(fn($image) => $image['image'])->toArray(),
            "location" => $property['location'] ? [
                "id" => $property['location']['id'],
                "property_id" => $property['location']['property_id'],
                "longitude" => $property['location']['longitude'],
                "latitude" => $property['location']['latitude'],
                "region" => $property['location']['region'],
                "created_at" => $property['location']['created_at'],
                "updated_at" => $property['location']['updated_at']
            ] : null,
        ];
    }
    
    public function index()
    {
        $properties = Property::with(['images', 'location'])->get();
    
        $properties = $properties->map(function ($property) {
            return $this->transformPropertyResponse($property);
        });
    
        return response()->json($properties);
    }
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'bedrooms' => 'required|integer|min:0',
            'bathrooms' => 'required|integer|min:0',
            'area' => 'required|integer|min:0',
            'propertyType' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'dealType' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'location.longitude' => 'nullable|numeric',
            'location.latitude' => 'nullable|numeric',
            'location.region' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $property = Property::create($request->except(['images', 'location']));

        if ($request->has('images')) {
            foreach ($request->images as $image) {
                PropertyImage::create(['property_id' => $property->id, 'image' => $image]);
            }
        }

        if ($request->has('location')) {
            PropertyLocation::create(array_merge($request->location, ['property_id' => $property->id]));
        }

        $property->load(['images', 'location']);
        $property = $this->transformPropertyResponse($property);

        return response()->json($property, 201);
    }

    public function show($id)
    {
        $property = Property::with(['images', 'location'])->findOrFail($id);
        $property = $this->transformPropertyResponse($property);

        return response()->json($property);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'area' => 'nullable|integer|min:0',
            'propertyType' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'dealType' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'location.longitude' => 'nullable|numeric',
            'location.latitude' => 'nullable|numeric',
            'location.region' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $property = Property::findOrFail($id);
        $property->update($request->except(['images', 'location']));

        if ($request->has('images')) {
            PropertyImage::where('property_id', $id)->delete();
            foreach ($request->images as $image) {
                PropertyImage::create(['property_id' => $id, 'image' => $image]);
            }
        }

        if ($request->has('location')) {
            PropertyLocation::updateOrCreate(
                ['property_id' => $id],
                $request->location
            );
        }

        $property->load(['images', 'location']);
        $property = $this->transformPropertyResponse($property);

        return response()->json($property);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        $property->delete();

        return response()->json(['message' => 'Property deleted successfully.']);
    }
}
