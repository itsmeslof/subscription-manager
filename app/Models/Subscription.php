<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    // Maximum unsigned int value '4294967295', rounded down, creating a maximum USD amount of 42_949_672
    const MAX_MINOR_AMOUNT = 4_294_967_200;

    protected $fillable = ['name', 'cost', 'cycle', 'active', 'renewal_note'];
}
