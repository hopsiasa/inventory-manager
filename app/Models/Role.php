<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    public const ROLE_ADMINISTRATOR = 1;
    public const ROLE_MANAGER = 2;
    public const ROLE_CUSTOMER = 3;

    protected $fillable = ['name'];

}
