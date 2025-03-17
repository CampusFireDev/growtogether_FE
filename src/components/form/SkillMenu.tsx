import React, { useState} from "react";
import SelectMenu from "../../components/form/SelectMenu";
import TechStackBadge from "../../components/common/ui/TechStackBadge";
import useBootcampSkillName from "../../hooks/bootcamp/useBootcampSkillList";

interface SkillMenuProps {
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    formData: any;
};

const SkillMenu = ({ setFormData, formData}: SkillMenuProps) =>{
    const { skillName, loading, error } = useBootcampSkillName();
    const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);

    const handleTechStackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedTechStacks(prevSelectedTechStacks => 
            Array.from(new Set([...prevSelectedTechStacks, ...value])) 
        );
        setFormData({ ...formData, skillNames: [...selectedTechStacks, ...value] });
    };

    const handleDeleteTechStack = (stack: string) => {
        setSelectedTechStacks((prevStacks)=>prevStacks.filter((s)=> s !== stack));
    };
    
    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>;
    return (
        <>
            <SelectMenu label="학습 언어" labelClassName="nexon-medium text-sm" className="my-1" placeholder="사용 언어를 선택해주세요." options={skillName} onChange={handleTechStackChange}/>
                <div className="mt-3">
                    {selectedTechStacks.map((stack, index) => (
                        <TechStackBadge key={index} stack={stack} className="mr-3 mb-2" 
                            showDeleteIcon={true} onDelete={handleDeleteTechStack}
                        />
                    ))}
                </div>
        </>
    )
};

export default SkillMenu;