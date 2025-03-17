interface FormButtonProps {
    type: "button" | "submit"; // 기본값: "button"
    children: React.ReactNode;
    onClick?: () => void;
    onSubmit?: (event: React.FormEvent) => void; 
    className?: string;
}

const FormButton = ({ type = "button", children, onClick, onSubmit, className = "" }: FormButtonProps): JSX.Element => {
    const handleSubmit = (event: React.FormEvent) => {
        if (onSubmit) {
            onSubmit(event);  // onSubmit이 있을 경우 호출
        }
    };
    return (
        <button
            type={type}
            onClick={onClick}
            onSubmit={type === "submit" ? handleSubmit : undefined} 
            className={`w-full h-[55px] leading-[55px] bg-black text-white 
                rounded-[5px] nexon-bold cursor-pointer hover:opacity-85 ${className}`
            }
        >
            {children}
        </button>
    )
}

export default FormButton;