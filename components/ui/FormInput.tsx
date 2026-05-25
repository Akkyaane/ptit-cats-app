import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const fieldClass =
  "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary " +
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200";

type CommonProps = {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  wrapperClassName?: string;
};

type FormInputProps =
  | (CommonProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & { as?: "input" })
  | (CommonProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & { as: "textarea" })
  | (CommonProps &
      Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
        as: "select";
        children: React.ReactNode;
      });

export default function FormInput(props: FormInputProps) {
  const { label, id, required, error, wrapperClassName } = props;
  const errorId = error ? `${id}-error` : undefined;
  const ariaProps = {
    "aria-describedby": errorId,
    "aria-invalid": error ? ("true" as const) : undefined,
  };

  let field: React.ReactNode;

  if (props.as === "textarea") {
    const { label: _l, id: _i, required: _r, error: _e, as: _a, wrapperClassName: _w, ...rest } = props;
    field = (
      <textarea
        id={id}
        required={required}
        {...rest}
        {...ariaProps}
        className={`${fieldClass} resize-none`}
      />
    );
  } else if (props.as === "select") {
    const { label: _l, id: _i, required: _r, error: _e, as: _a, wrapperClassName: _w, children, ...rest } = props;
    field = (
      <select
        id={id}
        required={required}
        {...rest}
        {...ariaProps}
        className={`${fieldClass} bg-white appearance-none`}
      >
        {children}
      </select>
    );
  } else {
    const { label: _l, id: _i, required: _r, error: _e, as: _a, wrapperClassName: _w, ...rest } = props;
    field = (
      <input
        id={id}
        required={required}
        {...rest}
        {...ariaProps}
        className={fieldClass}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-1${wrapperClassName ? ` ${wrapperClassName}` : ""}`}>
      <label htmlFor={id} className="text-sm font-bold">
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden="true" className="text-primary text-base font-bold">
              *
            </span>
          </>
        )}
      </label>
      {field}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
