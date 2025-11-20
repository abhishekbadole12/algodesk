interface FormInputProps {
  label: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value = "",
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = "",
  min,
  max,
  step,
}: FormInputProps) {
  const id = name || label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-foreground"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input */}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        className={`w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-border focus:ring-primary/50"
        }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}`}
      />

      {/* Helper or Error Message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
