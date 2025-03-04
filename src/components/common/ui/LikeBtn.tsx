import { useState } from "react";
import { IoMdHeart,IoMdHeartEmpty } from "react-icons/io";
import FormButton from "../../form/FormButton";

interface LikeBtnProps{
    likeCount?: number;
    className?: string;
}

const LikeBtn = ({ likeCount, className }:LikeBtnProps):JSX.Element => {
    const [like, setLike] = useState(false);

    const likeHandle = () =>{
        setLike(!like);
    }
    return(
        <>
            <FormButton type="button" className={`!w-[80px] !h-[50px] !flex !items-center !justify-center border !bg-white !text-black6 text-[16px] ${like ? "border-[#F74175]": "border-gray5"}`}>
                <div className={`flex items-center justify-center gap-1 ${className}`} onClick={likeHandle}>
                    <div>
                        {like ? <IoMdHeart className="text-[#F74175]"/> : <IoMdHeartEmpty className="text-black6"/>}
                    </div>
                    <span className={`${like ? "text-[#F74175]" : "text-black6"}`}>{likeCount}</span>
                </div>
            </FormButton>
        </>
    )   
}

export default LikeBtn;