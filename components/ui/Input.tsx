type BaseInputProps = {
  name: string;
  required: boolean;
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputProps =
  | (BaseInputProps & {
      type: "text" | "password" | "email" | "tel";
      value: string;
      minLength?: number;
      autoComplete?: string;
      checked?: never;
    })
  | (BaseInputProps & {
      type: "number" | "date";
      value: string | number;
      min?: number;
      checked?: never;
    })
  | (BaseInputProps & {
      type: "checkbox";
      checked: boolean;
      value?: never;
    })
  | (BaseInputProps & {
      type: "file";
      accept: string;
      multiple: boolean;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      value?: never;
      checked?: never;
    });

export default function Input(props: InputProps) {
  const { type, name, required, labelName, onChange } = props;

  return (
    <div
      className={
        type === "checkbox" ? "flex items-center gap-2" : "flex flex-col gap-2"
      }
    >
      <label
        htmlFor={name}
        className={`${
          type === "checkbox" ? "font-normal" : "font-bold"
        } text-sm md:text-base`}
      >
        {labelName} {required && <span className="text-primary">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={type === "checkbox" || type === "file" ? undefined : props.value}
        min={type === "number" ? props.min : undefined}
        minLength={"minLength" in props ? props.minLength : undefined}
        autoComplete={"autoComplete" in props ? props.autoComplete : undefined}
        multiple={type === "file" ? props.multiple : undefined}
        checked={type === "checkbox" ? props.checked : undefined}
        required={required}
        onChange={onChange}
        placeholder={type !== "checkbox" && type !== "file" ? labelName : undefined}
        className={
          type === "checkbox"
            ? "size-4 accent-primary"
            : type === "file"
            ? "w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-tertiary file:text-sm file:text-quaternary hover:file:border-primary transition-colors duration-200"
            : "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        }
      />
    </div>
  );
}
