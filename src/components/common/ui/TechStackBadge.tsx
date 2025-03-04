interface TechStackBadgeProps {
    stack: string;
}

const stackStyles: Record<string, string> = {
    "React": "border-[#61DAFB] text-[#61DAFB]",
    "Javascript": "border-[#FFD600] text-[#FFD600]",
    "Typescript": "border-[#007ACC] text-[#007ACC]",
    "Spring": "border-[#70AD51] text-[#70AD51]",
};

const TechStackBadge = ({ stack }: TechStackBadgeProps) => {
    return (
        <span className={`inline-block h-[30px] px-[10px] text-sm/[30px] rounded-full border bg-white nexon-medium ${stackStyles[stack]}`}>
        {stack}
        </span>
    );
};
  

export default TechStackBadge;