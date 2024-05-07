export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'bg-transparent transition duration-150 ease border-neutral-700 border-b-2 focus:border-teal-500 focus:ring-teal-500 focus:ring-0 focus:ring-offset-0 shadow-sm ' +
                className
            }
        />
    );
}
