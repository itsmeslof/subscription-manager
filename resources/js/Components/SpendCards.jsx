export default function SpendCards({ monthlyValues, yearlyValues }) {
    const totalMonthlySpendAmount = monthlyValues.reduce((acc, val) => acc + val, 0);
    const totalYearlySpendAmount = yearlyValues.reduce((acc, val) => acc + val, 0);

    const monthlySpendStr = fmtCurrencyStr(totalMonthlySpendAmount);
    const yearlySpendStr = fmtCurrencyStr((totalMonthlySpendAmount * 12) + totalYearlySpendAmount);

    function fmtCurrencyStr(cents) {
        return (cents / 100).toLocaleString("en-US", {style: "currency", currency: "USD"});
    }

    return (
        <div className="flex gap-4">
            <div className="border border-b-4 border-neutral-700 p-6 flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-1">
                    <p className="text-neutral-400 text-sm">Monthly Spend</p>
                    <p className="text-neutral-100 text-3xl font-semibold inline-flex gap-2 items-center">
                        {monthlySpendStr}
                        <span className="text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800">USD</span>
                    </p>
                </div>
                <p className="text-neutral-400 text-sm">
                    Monthly Spend only factors in Subscriptions with a <span className="text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800">Monthly</span> billing cycle.
                </p>
            </div>
            <div className="border border-b-4 border-neutral-700 p-6 flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-1">
                    <p className="text-neutral-400 text-sm">Yearly Spend</p>
                    <p className="text-neutral-100 text-3xl font-semibold inline-flex gap-2 items-center">
                        {yearlySpendStr}
                        <span className="text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800">USD</span>
                    </p>
                </div>
                <p className="text-neutral-400 text-sm">
                    Yearly Spend factors in Subscriptions of <span className="text-neutral-200 text-xs py-1 px-2 rounded-full bg-neutral-800">All</span> billing cycles.
                </p>
            </div>
        </div>
    );
}
