import TechStackBadge from "./TechStackBadge";

interface TechStackListProps {
  stacks: string[];
}

const TechStackList = ({ stacks }: TechStackListProps) => {
  return (
    <ul className="flex flex-wrap gap-2 mt-[15px]">
      {stacks.map((stack) => (
        <li key={stack}>
          <TechStackBadge stack={stack} />
        </li>
      ))}
    </ul>
  );
};

export default TechStackList;
