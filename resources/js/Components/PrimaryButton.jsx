export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-transparent border border-neutral-700 font-semibold text-sm text-neutral-300 hover:text-neutral-200 hover:bg-white/5 focus:bg-white/10 active:bg-white/10 focus:border-neutral-600 active:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
