import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SpendCards from '@/Components/SpendCards';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const Status = {
    ALL: "all",
    ACTIVE: "active",
    INACTIVE: "inactive",
};

const Cycle = {
    ALL: "all",
    MONTHLY: "monthly",
    SEMIYEARLY: "semi-yearly",
    YEARLY: "yearly",
};

export default function Index({ auth, subscriptions }) {
    const monthlyValues = subscriptions.filter(
        (subscription) => subscription.active && subscription.cycle === Cycle.MONTHLY
    ).map((subscription) => subscription.cost);

    const yearlyValues = subscriptions.filter(
        (subscription) => subscription.active &&
        [Cycle.SEMIYEARLY, Cycle.YEARLY].includes(subscription.cycle)
    ).map((subscription) => (subscription.cycle === Cycle.SEMIYEARLY) ? subscription.cost * 2 : subscription.cost);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Subscriptions" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-8">
                <SpendCards
                    monthlyValues={monthlyValues}
                    yearlyValues={yearlyValues}
                />

                <SubscriptionsTable subscriptions={subscriptions} />
            </div>
        </AuthenticatedLayout>
    );
}

function SubscriptionsTable({ subscriptions = [] }) {
    const [statusFilter, setStatusFilter] = useState(Status.ALL);
    const [cycleFilter, setCycleFilter] = useState(Cycle.ALL);
    const [searchFilter, setSearchFilter] = useState("");

    const filteredResults = subscriptions
        .filter((subscription) => {
            if (statusFilter === Status.ALL) return true;
            if (statusFilter === Status.ACTIVE) return subscription.active;
            if (statusFilter === Status.INACTIVE) return !subscription.active;
        })
        .filter((subscription) => cycleFilter === Cycle.ALL || subscription.cycle === cycleFilter)
        .filter((subscription) => {
            return !searchFilter || subscription.name.toLowerCase().includes(searchFilter.toLowerCase());
        });

    return (
        <div className="border border-neutral-700 border-b-4 p-6 w-full flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <p className="text-2xl text-neutral-100 font-semibold">
                        <span className="capitalize">{statusFilter}</span>{" "}
                        Subscriptions
                    </p>
                    <span className="text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800">
                        {filteredResults.length} results
                    </span>
                </div>

                <Link className="text-teal-500 hover:text-teal-400 transition duration-150 ease-in-out inline-flex items-center gap-2 underline underline-offset-4" href={route('subscriptions.create')}>
                    Add Subscription
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="search" value="Filter By Name" />

                    <TextInput id="search" placeholder="Search..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="status" value="Filter By Status" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <PrimaryButton id="status" className="min-w-[140px] inline-flex justify-between">
                                <span className="capitalize">{statusFilter}</span>

                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </PrimaryButton>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStatusFilter(Status.ALL);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Status.ALL}
                            </Dropdown.Link>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStatusFilter(Status.ACTIVE);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Status.ACTIVE}
                            </Dropdown.Link>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStatusFilter(Status.INACTIVE);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Status.INACTIVE}
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="flex flex-col gap-2">
                    <InputLabel htmlFor="cycle" value="Filter By Cycle" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <PrimaryButton id="cycle" className="min-w-[140px] inline-flex justify-between">
                                <span className="capitalize">{cycleFilter}</span>

                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </PrimaryButton>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCycleFilter(Cycle.ALL);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Cycle.ALL}
                            </Dropdown.Link>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCycleFilter(Cycle.MONTHLY);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Cycle.MONTHLY}
                            </Dropdown.Link>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCycleFilter(Cycle.SEMIYEARLY);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Cycle.SEMIYEARLY}
                            </Dropdown.Link>
                            <Dropdown.Link
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCycleFilter(Cycle.YEARLY);
                                }}
                                as="button"
                                className="capitalize"
                            >
                                {Cycle.YEARLY}
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            <hr className="border-neutral-700" />

            {/* Body */}
            <div className="flex flex-col gap-2">
                {filteredResults.map((result) => {
                    return <SubscriptionCard key={result.id} subscription={result} />
                })}
            </div>
        </div>
    );
}

function SubscriptionCard({ subscription }) {
    const costStr = (subscription.cost / 100)
        .toLocaleString("en-US", {style: "currency", currency: "USD"});
    
    const activeBadgeClasses = "transition duration-150 ease-in-out text-teal-200 text-xs py-1 px-2 rounded-full bg-teal-800 group-hover:bg-teal-700";
    const inactiveBadgeClasses = "transition duration-150 ease-in-out text-rose-200 text-xs py-1 px-2 rounded-full bg-rose-800 group-hover:bg-rose-700";

    return (
        <div className="group bg-neutral-900 hover:bg-neutral-800 transition duration-150 ease-in-out p-4 flex gap-2 justify-between">
            <div className="flex flex-col gap-2">
                <div className="flex items-center">
                    <p className="text-neutral-400 min-w-[200px]">
                        Name
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-neutral-100">
                            {subscription.name}
                        </p>
                        <span className={subscription.active ? activeBadgeClasses : inactiveBadgeClasses}>
                            {subscription.active ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="text-neutral-400 min-w-[200px]">
                        Cost
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-neutral-100">
                            {costStr}
                        </p>
                        <span className="transition duration-150 ease-in-out text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800 group-hover:bg-neutral-700">
                            USD
                        </span>
                        <span className="transition duration-150 ease-in-out text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800 group-hover:bg-neutral-700 capitalize">
                            {subscription.cycle}
                        </span>
                    </div>
                </div>
                <div className="flex items-center">
                    <p className="text-neutral-400 min-w-[200px]">
                        Renewal Note
                    </p>
                    <p className="text-neutral-100">
                        {subscription.renewal_note || <span className="text-neutral-500 italic">No renewal note</span>}
                    </p>
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex items-center">
                <Link className="text-teal-500 hover:text-teal-400 transition duration-150 ease-in-out inline-flex items-center gap-2 underline underline-offset-4" href={route('subscriptions.edit', { subscription: subscription.id })}>
                    Edit Subscription
                </Link>
            </div>
        </div>
    );
}
