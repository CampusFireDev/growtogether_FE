interface SelectMenuProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    placeholder?: string;
    options: string[];
    className?: string;
    // isCustomComponent?: boolean; 
}

const SelectMenu = ({ label, labelFor, labelClassName = "", placeholder, options, className = "" }: SelectMenuProps): JSX.Element => {
    return (
        <div className={`${className}`}>
            {label && (
                <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>
                    {label}
                </label>
            )}
            {/* isCustomComponent가 true이면 options을 직접 렌더링 */}
            
            <select className={`w-full h-[50px] pl-[15px] pr-[15px] border border-[#e5e5e5] rounded-[5px] ${className}`}>
                <option value="" className="text-black7">{placeholder}</option>
                {(options as string[]).map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectMenu;
