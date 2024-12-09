<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'bedrooms',
        'bathrooms',
        'area',
        'propertyType',
        'category',
        'dealType',
        'leaseTerm',
        'floors',
        'noiseLevel',
        'laundry',
        'internet',
        'condition',
        'video',
        'price',
        'view',
        'outdoor',
        'propertyStyle',
        'securityFeatures',
        'amenities',
        'heating',
        'cooling',
        'priceType',
        'views',
        'likes',
    ];

    protected $casts = [
        'view' => 'array',
        'outdoor' => 'array',
        'propertyStyle' => 'array',
        'securityFeatures' => 'array',
        'amenities' => 'array',
        'heating' => 'array',
        'cooling' => 'array',
    ];
    public function images()
    {
        return $this->hasMany(PropertyImage::class, 'property_id');
    }

    public function location()
    {
        return $this->hasOne(PropertyLocation::class, 'property_id');
    }

}
