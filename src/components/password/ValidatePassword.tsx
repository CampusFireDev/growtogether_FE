import { useState, useEffect } from "react";
import { FaCheckSquare } from "react-icons/fa";

interface ValidatePasswordProps {
    password: string;
};

const ValidatePassword = ({ password }:ValidatePasswordProps):JSX.Element => {
    const [passwordCriteria, setPasswordCriteria] = useState({
        length:false, letter: false, number: false ,specialChar: false
    });

    useEffect(() => {
        const length = password.length >=8;
        const letter = /[A-Za-z]/.test(password);
        const number = /\d/.test(password);
        const specialChar = /[@$!%*?&]/.test(password);
        setPasswordCriteria({ length, letter, number, specialChar });
    },[password]);

    return(
        
        <ul className="absolute flex gap-5 nexon-medium text-[12px] top-full text-nowrap">
                <li className={`flex gap-1 items-center ${passwordCriteria.length ? "text-myGreen" : "text-black9"}`}>
                    <FaCheckSquare /> 8자 이상
                </li>
                <li className={`flex gap-1 items-center ${passwordCriteria.letter ? "text-myGreen" : "text-black9"}`}>
                    <FaCheckSquare /> 영문 포함
                </li>
                <li className={`flex gap-1 items-center ${passwordCriteria.number ? "text-myGreen" : "text-black9"}`}>
                    <FaCheckSquare /> 숫자 포함
                </li>
                <li className={`flex gap-1 items-center ${passwordCriteria.specialChar ? "text-myGreen" : "text-black9"}`}>
                    <FaCheckSquare /> 특수 문자 포함
                </li>
            </ul>
    )
};

export default ValidatePassword;