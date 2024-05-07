import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'bg-transparent text-sm py-2 px-2 text-neutral-200 placeholder:text-neutral-500 transition duration-150 ease border-neutral-700 focus:border-teal-500 focus:ring-teal-500 shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
