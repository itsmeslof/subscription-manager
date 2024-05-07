<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroySubscriptionRequest;
use App\Models\Subscription;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function __construct(private SubscriptionService $service)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Subscriptions/Index', ['subscriptions' => $request->user()->subscriptions]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Subscriptions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscriptionRequest $request)
    {
        $this->service->store($request->user(), $request->validated());

        $request->session()->flash('status', 'Subscription Created');
        
        return to_route('subscriptions.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Subscription $subscription)
    {
        if ($subscription->user_id !== $request->user()->id) {
            abort(404);
        }
        
        return Inertia::render('Subscriptions/Edit', ['subscription' => $subscription]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSubscriptionRequest $request, Subscription $subscription)
    {
        if ($subscription->user_id !== $request->user()->id) {
            abort(404);
        }

        $this->service->update($subscription, $request->validated());

        $request->session()->flash('status', 'Subscription Updated');

        return to_route('subscriptions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroySubscriptionRequest $request, Subscription $subscription)
    {
        if ($subscription->user_id !== $request->user()->id) {
            abort(404);
        }

        $validated = $request->validated();
        if ($validated['name_confirmation'] !== $subscription->name) {
            $request->session()->flash('error', 'Please confirm the Subscription name');
            return back();
        }

        $subscription->delete();

        $request->session()->flash('status', 'Subscription Deleted');

        return to_route('subscriptions.index');
    }
}
