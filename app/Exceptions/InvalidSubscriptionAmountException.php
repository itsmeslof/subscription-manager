<?php

namespace App\Exceptions;

use Exception;

class InvalidSubscriptionAmountException extends Exception
{
    public function render($request)
    {
        return back()->withErrors($this->getMessage());
    }
}