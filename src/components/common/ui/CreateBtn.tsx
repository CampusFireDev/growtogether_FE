import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useContentType } from "../../../context/ContentTypeContext";
const CreateBtn = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { contentType } = useContentType();
    const isBootcamp = contentType === "bootcamp" ? "부트캠프 후기 작성하기" : "스터디 개설하기";
    
    return (
        <Link to={`/${contentType}/create`}>
            <button
                className={`fixed bottom-13 right-5 flex items-center gap-2 px-4 h-[50px] text-[13px] text-white bg-myBlue/88 rounded-full shadow-lg cursor-pointer z-50 
                transition-all duration-300 ${isHovered ? "w-[190px] pl-5 pr-5 rounded-[10px]" : "w-[50px] justify-center"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Plus size={24} />
                {isHovered && <span>{isBootcamp}</span>}
            </button>
        </Link>
    );
};

export default CreateBtn;