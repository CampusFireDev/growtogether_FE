import { useState, useEffect } from "react";
import { useContentType } from "../../../context/ContentTypeContext"; 
import { IoMdHeart,IoMdHeartEmpty } from "react-icons/io";
import FormButton from "../../form/FormButton";
import useMyLikes from "../../../hooks/mypage/useMyLikes";

interface LikeBtnProps {
    likeCount?: number;
    className?: string;
    postId: number;
};

const LikeBtn = ({ likeCount, className, postId }:LikeBtnProps):JSX.Element => {
    const [liked, setLiked] = useState(false);
    // const [count, setCount] = useState(likeCount);
    const { contentType } = useContentType();
    const { myLikes, handleBootcampLike, handleStudyLike } = useMyLikes();

    useEffect(() => {
        const isLiked = myLikes.some((item) => item.postId === postId);
        setLiked(isLiked);
    }, [myLikes, postId]);
    
    const likeHandle = () =>{
        console.log("🎯",myLikes);
        setLiked(!liked);
        console.log("⭕", postId);
        if(contentType === "bootcamp"){
            handleBootcampLike(postId);
        } else if(contentType === "study"){
            handleStudyLike(postId);
        }

    };


    return(
        <>
            <FormButton type="button" className={`!w-[80px] !flex !items-center !justify-center border !bg-white !text-black6 text-[16px] ${liked ? "border-[#F74175]": "border-gray5"}`}>
                <div className={`flex items-center justify-center gap-1 ${className}`} onClick={likeHandle}>
                    <div>
                        {liked ? <IoMdHeart className="text-[#F74175]"/> : <IoMdHeartEmpty className="text-black6"/>}
                    </div>
                    <span className={`${liked ? "text-[#F74175]" : "text-black6"}`}>{likeCount}</span>
                </div>
            </FormButton>
        </>
    )   
};

export default LikeBtn;


// 0: 
// {postId: 36, title: '테스트 3', type: '부트캠프 리뷰'}
// length : 1
// [[Prototype]]: Array(0)