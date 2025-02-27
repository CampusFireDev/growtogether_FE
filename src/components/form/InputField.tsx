interface InputFieldProps {
    label?: string;
    type?: 'text' | 'password' | 'date' | 'number' | 'checkbox' | 'radio';
    placeholder?: string;
    value?: string;
    className?: string;
}

const InputField = ({ label, type="text", placeholder, value, className="" }: InputFieldProps): JSX.Element => {
    return (
        <div className={`${className}`}>
            { label && <label>{label}</label> }
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                className="w-full h-[50px] pl-[15px] pr-[15px] border border-[#e5e5e5] rounded-[5px]"
            />
        </div>
    )
}
export default InputField;