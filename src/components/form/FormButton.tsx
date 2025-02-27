interface FormButtonProps {
    type: "button" | "submit"; // 기본값: "button"
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const FormButton = ({ type = "button", children, onClick, className = "" }: FormButtonProps): JSX.Element => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full h-[55px] leading-[55px] bg-black text-white rounded-[5px] nexon-bold cursor-pointer ${className}`}
        >
            {children}
        </button>
    )
}

export default FormButton;