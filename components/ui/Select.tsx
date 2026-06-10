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
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm md:text-base font-bold">
        {labelName} {required && <span className="text-primary">*</span>}
      </label>

      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
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
