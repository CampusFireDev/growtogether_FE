interface Option {
    value: string;
    label: string;
}

interface CommonSelectProps {
    label?: string;
    id?: string;
    name?: string;
    value: string ;
    options: Option[];
    onChange: (value: string) => void;
    className?: string;
}

const CommonSelect = ({ label, id, name, value, options, onChange, className="" }: CommonSelectProps): JSX.Element => {
    return (
        <div>
            {label && (
                <label htmlFor={id}>{label}</label>
            )}
            <select
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`h-[45px] border border-gray5 rounded-[5px] px-[8px] ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default CommonSelect;