type BaseInputProps = {
  name: string;
  required: boolean;
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputProps =
  | (BaseInputProps & { type: "text"; value: string; checked?: never })
  | (BaseInputProps & {
      type: "number" | "date";
      value: string | number;
      checked?: never;
    })
  | (BaseInputProps & { type: "checkbox"; checked: boolean; value?: never });

export default function Input({
  type,
  name,
  value,
  checked,
  required,
  labelName,
  onChange,
}: InputProps) {
  return (
    <div
      className={`${type === "checkbox" ? "flex items-center gap-2 cursor-pointer select-none" : "flex flex-col gap-1"}`}
    >
      <label htmlFor={name} className="text-sm font-bold">
        {labelName} {required && <span className="text-primary">*</span>}
      </label>

      <input
        id={name}
        type={type}
        required={required}
        value={type === "checkbox" ? undefined : value}
        checked={type === "checkbox" ? checked : undefined}
        onChange={onChange}
        placeholder={type !== "checkbox" ? labelName : undefined}
        className={`${type === "checkbox" ? "w-4 h-4 accent-primary shrink-0" : "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200 bg-white"}`}
      />
    </div>
  );
}
