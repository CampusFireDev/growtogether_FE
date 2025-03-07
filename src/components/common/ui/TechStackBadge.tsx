interface TechStackBadgeProps {
    stack: string;
    className?: string;
}

const stackStyles: Record<string, {color: string; img: string}> = {
    "React": {color: "border-[#61DAFB] text-[#61DAFB]", img: "/images/react.png"},
    "Javascript": {color: "border-[#FFD600] text-[#FFD600]", img:"/images/js.png"},
    "Typescript": {color: "border-[#007ACC] text-[#007ACC]", img:"/images/ts.png"},
    "Spring": {color: "border-[#70AD51] text-[#70AD51]", img:"/images/spring.png"},
};

const TechStackBadge = ({ stack, className }: TechStackBadgeProps) => {
    const stackData = stackStyles[stack];
    return (
        <span className={`inline-flex items-center h-[30px] px-[10px] text-sm/[30px] rounded-full border bg-white nexon-medium ${stackData.color} ${className}`}>
            <img src={stackData.img} alt={`${stack} icon`} className="w-[16px] h-[16px] mr-2" />
            {stack}
        </span>
    );
};
  

export default TechStackBadge;