<?php

namespace App\Services;

use App\Exceptions\InvalidSubscriptionAmountException;
use App\Helpers\MoneyHelper;
use App\Models\Subscription;
use App\Models\User;
use Brick\Math\Exception\NumberFormatException;

class SubscriptionService
{
    /**
     * Persist a new Subscription model to the database.
     *
     * @param User $user
     * @param array $subscriptionData
     */
    public function store(User $user, $subscriptionData): void
    {
        $minorAmount = $this->tryConvertAmountToMinor($subscriptionData['cost']);
        $this->ensureAmountUnderLimit($minorAmount);

        $subscriptionData['cost'] = $minorAmount;
        $user->subscriptions()->create($subscriptionData);
    }

    /**
     * Update an existing Subscription model.
     *
     * @param Subscription $subscription
     * @param array $subscriptionData
     */
    public function update(Subscription $subscription, $subscriptionData): void
    {
        $minorAmount = $this->tryConvertAmountToMinor($subscriptionData['cost']);
        $this->ensureAmountUnderLimit($minorAmount);

        $subscriptionData['cost'] = $minorAmount;
        $subscription->update($subscriptionData);
    }

    /**
     * Convert a numeric value to a minor currency value.
     *
     * @param string|int $amount
     *
     * @throws InvalidSubscriptionAmountException
     *
     * @return int
     */
    private function tryConvertAmountToMinor(string|int $amount): int
    {
        try {
            $minorAmount = MoneyHelper::createMoney($amount)->getMinorAmount()->toInt();
        } catch (NumberFormatException $e) {
            throw new InvalidSubscriptionAmountException('The cost must be a number.');
        }

        return $minorAmount;
    }

    /**
     * Ensures that the provided minor amount is not greater than the allowed maximum integer value in the database.
     *
     * @param int $minorAmount
     *
     * @throws InvalidSubscriptionAmountException
     */
    private function ensureAmountUnderLimit(int $minorAmount): void
    {
        if ($minorAmount > Subscription::MAX_MINOR_AMOUNT) {
            $formattedMaxAmount = MoneyHelper::formatMinor(Subscription::MAX_MINOR_AMOUNT);
            throw new InvalidSubscriptionAmountException('The maximum number allowed is ' . $formattedMaxAmount);
        }
    }
}
