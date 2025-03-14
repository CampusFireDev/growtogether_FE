import { RxCross2 } from "react-icons/rx";

interface TechStackBadgeProps {
    stack: string;
    className?: string;
    showDeleteIcon?: boolean; // 삭제 아이콘 표시 여부
    onDelete?: (stack: string) => void;
}

const stackStyles: Record<string, {color: string; img: string}> = {
    "React": {color: "border-[#61DAFB] text-[#61DAFB]", img: "/images/react.png"},
    "Javascript": {color: "border-[#FFD600] text-[#FFD600]", img:"/images/js.png"},
    "Typescript": {color: "border-[#007ACC] text-[#007ACC]", img:"/images/ts.png"},
    "Spring": {color: "border-[#70AD51] text-[#70AD51]", img:"/images/spring.png"},
};

const TechStackBadge = ({ stack, className, showDeleteIcon=false, onDelete }: TechStackBadgeProps) => {
    const stackData = stackStyles[stack];

    return (
        <span className={`inline-flex items-center h-[30px] px-[10px] text-sm/[30px] 
            rounded-full border bg-white nexon-medium ${stackData.color} ${className} ${showDeleteIcon}`}
        >
            <img src={stackData.img} alt={`${stack} icon`} className="mr-1" />
            {stack}
            {showDeleteIcon && (
                <button className="ml-1 text-black6 hover:text-black9 cursor-pointer" onClick={()=>onDelete?.(stack)}><RxCross2 /></button>
            )}
        </span>
    );
};
  

export default TechStackBadge;