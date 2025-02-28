interface InputFieldProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    type?: 'text' | 'password' | 'date' | 'number' | 'checkbox' | 'radio' | 'email' | 'tel' | 'url';
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    className?: string;
}

const InputField = ({ label, labelFor, labelClassName="", type="text", id, name, placeholder, value, className="" }: InputFieldProps): JSX.Element => {
    return (
        <div className={`${className}`}>
            { label && <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>{label}</label> }
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                className="w-full h-[50px] pl-[15px] pr-[15px] border border-[#e5e5e5] rounded-[5px]"
            />
        </div>
    )
}
export default InputField;