interface SelectMenuProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    placeholder?: string;
    options: string[];
    className?: string;
}

const SelectMenu = ({ label, labelFor, labelClassName="",placeholder, options, className="" }: SelectMenuProps): JSX.Element => {
    return (
        <div className={`${className}`}>
            {label && <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>{label}</label>}
            <select 
                className={`w-full h-[50px] pl-[15px] pr-[15px] border border-[#e5e5e5] rounded-[5px] ${className}`}
                >
                <option value="" className="text-black7">{placeholder}</option>
                {options.map((option, index)=>(
                    <option key={index} value={option}>
                    {option}
                </option>    
                ))}
            </select>
        </div>
    )
}

export default SelectMenu;