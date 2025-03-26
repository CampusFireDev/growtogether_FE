interface SelectMenuProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    placeholder?: string;
    options: string[] | number[] | { value: string | number; label: string }[];
    value?: string | number;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMenu = ({ label, labelFor, labelClassName="",placeholder, options, value, className="", onChange }: SelectMenuProps): JSX.Element => {
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>{label}</label>}
            <select value={value} className={`w-full h-[50px] pl-[15px] pr-[15px] border border-gray5 rounded-[5px] text-[13px] ${className}`}
                onChange={onChange} 
            >
                <option value="" className="text-black7">{placeholder}</option>

                {Array.isArray(options) ? options.map((option, index) => {
                    if (typeof option === "object" && option !== null) {
                        return (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        );
                    }
                return (
                    <option key={index} value={option}>
                        {option}
                    </option>
                );
            }) : null}
            </select>
        </div>
    )
}

export default SelectMenu;