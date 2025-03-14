interface ButtonStyleProps {
    icon?: React.ReactNode;
    label: string;
    className?: string;
    onClick?: () => void;
}

const ButtonStyle1 = ({ icon, label, className, onClick }: ButtonStyleProps):JSX.Element => {
    return (
        <button onClick={onClick} className={`flex items-center h-[40px] px-[20px] rounded-[50px] ${className} ${icon ? 'gap-2': ''}`}>
            {icon}
            {label}
        </button>
    )
}
export default ButtonStyle1;