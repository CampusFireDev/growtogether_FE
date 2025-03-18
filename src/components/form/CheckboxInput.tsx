interface RadioInputProps {
    id: string;
    name: string;
    value: string;
    label: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput = ({ id, name, value, label, checked, onChange }: RadioInputProps): JSX.Element => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <label
                htmlFor={id}
                className="flex items-center gap-1 cursor-pointer"
            >
                <span
                    className={`flex items-center justify-center w-[16px] h-[16px] border rounded-[3px]
                        ${checked ? "border-myBlue bg-myBlue" : "bg-white border-black9"}    
                    `}
                >
                    {checked &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M9 1L3.49268 7L1 4.6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    }
                </span>
                {label}
            </label>
        </div>
    );
};

export default CheckboxInput;
