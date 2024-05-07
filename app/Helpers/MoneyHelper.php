<?php

namespace App\Helpers;

use Brick\Math\RoundingMode;
use Brick\Money\Money;

class MoneyHelper
{
    /**
     * Create a Money instance from a minor amount.
     *
     * @param int $minorAmount
     * @param string $currency
     * @param \Brick\Money\Context $context
     * @param \Brick\Math\RoundingMode $roundingMode
     *
     * @return Money
     */
    public static function createMoneyOfMinor($minorAmount, $currency = 'USD', $context = null, $roundingMode = RoundingMode::DOWN): Money
    {
        return Money::ofMinor(
            $minorAmount,
            $currency,
            $context,
            $roundingMode
        );
    }

    /**
     * Create a Money instance from the provided amount.
     *
     * @param int $amount
     * @param string $currency
     * @param \Brick\Money\Context $context
     * @param \Brick\Math\RoundingMode $roundingMode
     *
     * @return Money
     */
    public static function createMoney($amount, $currency = 'USD', $context = null, $roundingMode = RoundingMode::DOWN): Money
    {
        return Money::of(
            $amount,
            $currency,
            $context,
            $roundingMode
        );
    }

    /**
     * Format a minor amount to a human-readable currency string.
     *
     * @param int $amount
     * @param string $currency
     * @param \Brick\Money\Context $context
     * @param \Brick\Math\RoundingMode $roundingMode
     *
     * @return string
     */
    public static function formatMinor($amount, $currency = 'USD', $context = null, $roundingMode = RoundingMode::DOWN): string
    {
        return static::createMoneyOfMinor(
            $amount,
            $currency,
            $context,
            $roundingMode
        )->formatTo('en_US');
    }
}