import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const Cycle = {
    MONTHLY: "monthly",
    SEMIYEARLY: "semi-yearly",
    YEARLY: "yearly",
};

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Subscription" />

            <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-8">
                <div className="border border-neutral-700 border-b-4 p-6 w-full flex flex-col gap-6">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <p className="text-2xl text-neutral-100 font-semibold">
                                Add A New Subscription
                            </p>
                        </div>
                    </div>

                    <hr className="border-neutral-700" />

                    <CreateForm />
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

function CreateForm() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        cost: "1.00",
        cycle: Cycle.MONTHLY,
        active: 1,
        renewal_note: "",
    });

    function submit(e) {
        e.preventDefault();

        post(route('subscriptions.store'));
    }

    return (
        <form onSubmit={submit} className="space-y-6 w-full flex flex-col items-start">
            <div className="max-w-md w-full flex flex-col gap-2">
                <InputLabel htmlFor="name" value="Subscription Name - Required" />

                <TextInput
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    isFocused
                />
            </div>
            <div className="max-w-md w-full flex flex-col gap-2">
                <InputLabel htmlFor="cost" value="Cost (USD) - Required" />

                <TextInput
                    id="cost"
                    value={data.cost}
                    onChange={(e) => setData('cost', e.target.value)}
                    required
                />
            </div>
            <div className="max-w-md w-full flex flex-col gap-2">
                <InputLabel htmlFor="cycle" value="Billing Cycle - Required" />

                <select
                    id="cycle"
                    className="inline-flex items-center px-2 py-2 bg-transparent border border-neutral-700 font-semibold text-sm text-neutral-300 hover:text-neutral-200 hover:bg-white/5 focus:bg-white/10 active:bg-white/10 focus:border-neutral-600 active:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ease-in-out duration-150"
                    value={data.cycle}
                    onChange={(e) => setData('cycle', e.target.value)}
                >
                    <option value={Cycle.MONTHLY} className="text-neutral-800">Monthly</option>
                    <option value={Cycle.SEMIYEARLY} className="text-neutral-800">Semi-Yearly</option>
                    <option value={Cycle.YEARLY} className="text-neutral-800">Yearly</option>
                </select>
            </div>
            <div className="max-w-md w-full flex flex-col gap-2">
                <InputLabel htmlFor="active" value="Status - Required" />

                <select
                    id="active"
                    className="inline-flex items-center px-2 py-2 bg-transparent border border-neutral-700 font-semibold text-sm text-neutral-300 hover:text-neutral-200 hover:bg-white/5 focus:bg-white/10 active:bg-white/10 focus:border-neutral-600 active:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ease-in-out duration-150"
                    value={data.active}
                    onChange={(e) => setData('active', e.target.value)}
                >
                    <option value={1} className="capitalize text-neutral-800">Active</option>
                    <option value={0} className="capitalize text-neutral-800">Inactive</option>
                </select>
            </div>
            <div className="max-w-md w-full flex flex-col gap-2">
                <InputLabel htmlFor="renewal_note" value="Renewal Note - Optional" />

                <TextInput
                    id="renewal_note"
                    value={data.renewal_note}
                    onChange={(e) => setData('renewal_note', e.target.value)}
                />
            </div>
            <div>
                <PrimaryButton type="submit">
                    Add Subscription
                </PrimaryButton>
            </div>
        </form>
    );
}
