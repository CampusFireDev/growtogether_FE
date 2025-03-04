interface TextAreaProps {
    name?: string;
    placeholder?: string;
    className?: string;
}

const TextArea = ({name, placeholder, className}:TextAreaProps):JSX.Element =>{
    return(
        <>
            <textarea 
                name={name} 
                placeholder={placeholder} 
                className={`border border-[#e5e5e5] rounded-[5px] p-2 ${className}`}>
            </textarea>
        </>
    )
}

export default TextArea;