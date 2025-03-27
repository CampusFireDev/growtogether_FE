import TechStackBadge from "./TechStackBadge";

interface TechStackListProps {
  stacks: string[];
  className?: string;
}

const TechStackList = ({ stacks, className }: TechStackListProps) => {
  return (
    <ul className={`flex flex-wrap gap-2 mt-[15px] ${className}`}>
      {stacks.map((stack) => (
        <li key={stack}>
          <TechStackBadge stack={stack} />
        </li>
      ))}
    </ul>
  );
};

export default TechStackList;
