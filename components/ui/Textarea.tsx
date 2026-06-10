type TextareaProps = {
  name: string;
  rows: number;
  required: boolean;
  value: string;
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  name,
  rows,
  value,
  required,
  labelName,
  onChange,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold text-sm md:text-base">
        {labelName} {required && <span className="text-primary">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={labelName}
        className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
      />
    </div>
  );
}
