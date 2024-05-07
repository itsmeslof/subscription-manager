import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function BaseLayout({ children }) {
    const page = usePage();
    const flash = page.props.flash;
    const errors = page.props.errors;

    useEffect(() => {
        if (flash?.status) toast.success(flash.status);
        if (flash?.error) toast.error(flash.error);

        if (!errors) return;
        Object.values(errors).forEach((err) => toast.error(err));
    }, [flash, errors]);

    return (
        <div className="bg-neutral-950">
            <Toaster />
            {children}
        </div>
    );
}