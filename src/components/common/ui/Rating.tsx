/**
 * 별점 컴포넌트
 */

import { FaStar, FaRegStar } from "react-icons/fa6";

interface RatingProps{
    rate: number;
}

const MAX_STARS = 5;

const Rating = ({ rate } : RatingProps ):JSX.Element =>{
    return (    
        <div className="flex text-myYellow">  
            {Array.from({ length: MAX_STARS }).map((_, i) =>
                i < rate ? <FaStar key={i} /> : <FaRegStar key={i} />
            )}
        </div>
    )
}

export default Rating;