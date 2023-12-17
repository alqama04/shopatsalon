'use client'

import { ComponentProps } from "react"
import { useFormStatus } from 'react-dom'

type FormSubmitButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">

function FormSubmit(
    { children, className, ...props }: FormSubmitButtonProps
) {

    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            disabled={pending}
            className={`btn ${className}`}
        >
            {children}
            {pending && <span className="loading loading-spinner" />}
            </button>
    )
}

export default FormSubmit