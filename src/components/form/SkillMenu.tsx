import React, { useState, useEffect} from "react";
import SelectMenu from "../../components/form/SelectMenu";
import TechStackBadge from "../../components/common/ui/TechStackBadge";
import { useContentType } from "../../context/ContentTypeContext";
import useBootcampSkillName from "../../hooks/bootcamp/useBootcampSkillList";

interface SkillMenuProps {
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    formData: any;
    navLabel?: boolean; 
};

const SkillMenu = ({ setFormData, formData, navLabel}: SkillMenuProps) =>{
    const { skillName, loading, error } = useBootcampSkillName();
    const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const { contentType } = useContentType();

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

    const toggleMenu = () => {
        if (navLabel) setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        setSelectedTechStacks(formData.skillNames); 
    }, [formData.skillNames]); 
    
    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>;
    return (
        <div className="flex flex-col relative z-1">
            <SelectMenu
                label={!navLabel ? "학습 언어" : undefined}
                labelClassName="nexon-medium text-sm"
                className={!navLabel ? "my-1" : "!h-[40px] text-[11px] sm:text-[15px] !w-full !min-w-50"}
                placeholder={!navLabel ? "사용 언어를 선택해주세요." : contentType === "bootcamp" ? "학습 언어" : "기술 스택"}
                options={skillName ?? []}
                onChange={handleTechStackChange}
            />
            
            {/* 메뉴 박스 */}
            <div className="absolute top-10 w-full">
                {isMenuOpen && (
                    <div className="p-3 border border-gray5 rounded-[5px] bg-white w-full z-100 ">
                        {selectedTechStacks.map((stack, index) => (
                            <TechStackBadge key={index} stack={stack} 
                                className={`mr-3 mb-2 ${!navLabel ? "" : "!text-[10px] !h-[25px] !px-[7px]"}`}
                                showDeleteIcon={true} onDelete={handleDeleteTechStack}
                            />
                        ))}

                        <button 
                            onClick={toggleMenu} 
                            className="text-[11px] text-black9 block w-full text-center mt-2"
                        >
                            close
                        </button>
                    </div>
                )}

                {navLabel && !isMenuOpen && selectedTechStacks.length > 0 && (
                    <button 
                        onClick={toggleMenu} 
                        className="text-[11px] text-black9 block w-full text-center"
                    >
                        open
                    </button>
                )}
            </div>

            {!navLabel && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTechStacks.map((stack, index) => (
                        <TechStackBadge 
                            key={index} 
                            stack={stack} 
                            className="mr-3 mb-2"
                            showDeleteIcon={true} 
                            onDelete={handleDeleteTechStack}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillMenu;