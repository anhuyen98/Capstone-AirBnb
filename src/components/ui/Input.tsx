import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
type InputProps = {
  ref?: React.LegacyRef<HTMLInputElement>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  value?: string | number | readonly string[],
  name?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  errors?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
};

export const Input = ({
  ref,
  onChange,
  value,
  name,
  label,
  id,
  placeholder,
  type = "text",
  className = "",
  register,
  errors,
}: InputProps) => {
  return (
    <div className="mt-16">
      {!!label && <label htmlFor={id}>{label}</label>}
      <input
        ref={ref}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        {...register?.(name)}
      />
      {!!errors && <p className="text-red-800 ">{errors || ''}</p>}
    </div>
  );
};
