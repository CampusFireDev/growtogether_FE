interface TextAreaProps {
    label?: string;
    labelFor?: string;
    labelClassName?: string;
    id?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({label, labelFor, labelClassName="", id, name, value, placeholder, className="", onChange}:TextAreaProps):JSX.Element =>{
    return(
        <>
            { label && <label htmlFor={labelFor} className={`block mb-2 ${labelClassName}`}>{label}</label> }
            <textarea id={id} 
                name={name} 
                value={value}
                placeholder={placeholder} 
                className={`w-full border border-gray5 rounded-[5px] p-2 bg-white ${className}`}
                onChange={onChange}>
            </textarea>
        </>
    )
}

export default TextArea;