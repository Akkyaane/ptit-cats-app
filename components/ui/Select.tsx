interface SelectProps {
  name: string;
  value: string;
  options: { key: string; value: string }[];
  translatedOptions?: Record<string, string>;
  required: boolean;
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  name,
  value,
  options,
  translatedOptions,
  required,
  labelName,
  onChange,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-bold">
        {labelName} {required && <span className="text-primary">*</span>}
      </label>

      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200 bg-white"
      >
        <option value="" hidden>Sélectionner une option</option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {translatedOptions?.[option.key] ?? option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
