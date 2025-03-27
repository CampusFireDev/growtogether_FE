import useBootcampSkillName from "../../../hooks/bootcamp/useBootcampSkillList";
import SelectMenu from "../../form/SelectMenu";
import TechStackBadge from "./TechStackBadge";

interface TechSelectProps {
    availableStacks: string[];
    selectedStacks: string[];
    onChangeSelectedStacks: (stacks: string[]) => void;
}

const TechSelectBox = ({ availableStacks, selectedStacks, onChangeSelectedStacks }: TechSelectProps): JSX.Element => {
    // 기술스택 리스트 가져오기
    const { skillName } = useBootcampSkillName();

    console.log(availableStacks);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value && !selectedStacks.includes(value)) {
            onChangeSelectedStacks([...selectedStacks, value]);
        }
    };

    const handleDeleteStack = (stack: string) => {
        onChangeSelectedStacks(selectedStacks.filter((s) => s !== stack));
    };

    return (
        <div>
            <SelectMenu
                label="기술스택"
                labelClassName="nexon-medium text-[15px] text-black4"
                placeholder="기술 스택을 선택해주세요."
                options={skillName ?? []}
                onChange={handleSelectChange}
            />
            <div className="flex flex-wrap gap-1 mt-2">
                {selectedStacks.map((stack, index) => (
                    <TechStackBadge
                        key={index}
                        stack={stack}
                        showDeleteIcon={true}
                        onDelete={() => handleDeleteStack(stack)}
                    />
                ))}
            </div>
        </div>
    )
}

export default TechSelectBox;