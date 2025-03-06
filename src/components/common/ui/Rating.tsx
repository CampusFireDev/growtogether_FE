/**
 * 별점 컴포넌트
 */

import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

interface RatingProps{
    rate?: number;
    onRateChange?: (newRate: number) => void;
    readOnly?: boolean;
}

const MAX_STARS = 5;

const Rating = ({ rate = 0, onRateChange, readOnly = false } : RatingProps ):JSX.Element =>{
    const [selectedRate, setSelectedRate] = useState(rate); 
    
    const handleClick = (newRate: number) => {
        if (readOnly) return;
        setSelectedRate(newRate);
        if (onRateChange) onRateChange(newRate); 
    };

    return (    
        <div className="flex text-myYellow">  
            {Array.from({ length: MAX_STARS }).map((_, i) =>
                <div key={i} onClick={() => handleClick(i + 1)} className={readOnly ? "cursor-default" : "cursor-pointer"}>
                    {i < selectedRate ? <FaStar /> : <FaRegStar />}
                </div>
            )}
        </div>
    )
}

export default Rating;