import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-teal-600 text-teal-500 focus:border-teal-700 '
                    : 'border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-600 focus:text-neutral-300 focus:border-neutral-600 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
