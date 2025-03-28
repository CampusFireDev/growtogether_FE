interface InputFieldProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    type?: 'text' | 'password' | 'date' | 'number' | 'checkbox' | 'radio' | 'email' | 'tel' | 'url' | 'time';
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    className?: string;
    inputClassName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    children?: React.ReactNode;
    helperText?: string; 
    disabled?: boolean;
}   

const InputField = ({ label, labelFor, labelClassName="", type="text", id, name, placeholder, value, className="", inputClassName, onChange, children, helperText, disabled}: InputFieldProps): JSX.Element => {
    return (
        <div className={`bg-white text-black ${className}`}>
            { label && <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>{label}</label> }
            <div className="relative w-full">
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange} 
                    disabled={disabled}
                    className={`w-full h-[50px] pl-[15px] pr-[15px] border border-gray5 rounded-[5px] text-sm ${inputClassName}`} 
                />
                {children && <div className="absolute right-3 top-1/2 -translate-y-1/2">{children}</div>}
            </div>
            {helperText && <p className="mt-1 text-red-500">{helperText}</p>} 
        </div>
    )
}
export default InputField;