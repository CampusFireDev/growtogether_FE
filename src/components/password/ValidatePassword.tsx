import { useState, useEffect } from "react";
import { FaCheckSquare } from "react-icons/fa";

interface ValidatePasswordProps {
    password: string;
    onValidationChange: (criteria: PasswordCriteria) => void; // 부모 컴포넌트에 검증
};

interface PasswordCriteria {
    length: boolean;
    letter: boolean;
    number: boolean;
    specialChar: boolean;
}

const ValidatePassword = ({ password, onValidationChange }: ValidatePasswordProps):JSX.Element => {
    const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
        length:false, letter: false, number: false ,specialChar: false
    });

    useEffect(() => {
        const length = password.length >=8;
        const letter = /[A-Za-z]/.test(password);
        const number = /\d/.test(password);
        const specialChar = /[@$!%*?&]/.test(password);
        
        const updatedCriteria = { length, letter, number, specialChar };
        
        setPasswordCriteria(updatedCriteria);
        onValidationChange(updatedCriteria);
    },[password]);

    return(
        
        <ul className="flex gap-5 nexon-medium text-[12px] top-full text-nowrap">
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