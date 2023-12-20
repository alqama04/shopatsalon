"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

function FormSubmit({ children, className, ...props }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <button
          {...props}
          type="submit"
          disabled={pending}
          className={className}
        >
          {children}
          {pending && <span className="loading loading-spinner" />}
        </button>
      ) : (
        <span {...props} className={className}>
          {children}
          <span className="loading loading-spinner" />
        </span>
      )}
    </>
  );
}

export default FormSubmit;
