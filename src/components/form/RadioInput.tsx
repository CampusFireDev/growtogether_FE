interface RadioInputProps {
    id: string;
    name: string;
    value: string;
    label: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = ({ id, name, value, label, checked, onChange }: RadioInputProps): JSX.Element => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
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
                    className={`flex items-center justify-center w-[16px] h-[16px] border rounded-full
                        ${checked ? "border-myBlue" : "bg-white border-black9"}    
                    `}
                >
                    <span
                        className={`w-[8px] h-[8px] bg-myBlue rounded-full
                            ${checked ? "opacity-100": "opacity-0"}
                        `}
                    ></span>
                </span>
                {label}
            </label>
        </div>
    );
};

export default RadioInput;
