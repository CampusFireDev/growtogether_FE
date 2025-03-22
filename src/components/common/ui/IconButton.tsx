interface IconButtonProps {
    icon: React.ReactNode;
    label: string;
    color: "gray" | "green" | "red";
    onClick?: () => void;
}

const IconButton = ({ icon, label, color, onClick }: IconButtonProps): JSX.Element => {
    const colorClasses = {
        gray: "text-black6",
        green: "text-myGreen",
        red: "text-myRed",
    };

    return (
        <button onClick={onClick} className={`flex items-center gap-1 nexon-medium text-sm cursor-pointer ${colorClasses[color]}`}>
            {icon}
            {label}
        </button>
    )
}

export default IconButton;