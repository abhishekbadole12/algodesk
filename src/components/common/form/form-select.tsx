//

interface FormSelectProps {
  label: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  error,
  disabled = false,
  required = false,
  className = "",
}: FormSelectProps) {
  const id = name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-foreground"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Select */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 bg-background border rounded-lg text-sm
          focus:outline-none focus:ring-2 text-foreground cursor-pointer
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-border focus:ring-primary/50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}`}
      >
        {/* Placeholder option (not selectable) */}
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {/* Map options */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Error Display */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
