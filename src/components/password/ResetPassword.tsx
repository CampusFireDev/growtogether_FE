import { useState } from "react";
import FormButton from "../form/FormButton";
import InputField from "../form/InputField";
import ValidatePassword from "./ValidatePassword";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const resetPassword = ():JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword ] = useState<boolean>(false);
    const [error] = useState<{ [key: string]: string }>({});

    const handleShow = () => {
        setShowPassword((prev) => !prev);
    };

    return(
        <div className="text-center w-[400px] mx-auto">
            <h1 className="text-2xl nexon-bold py-12">비밀번호 재설정</h1>
            <p className="text-sm mb-10 text-black8"> 변경하실 비밀번호를 입력해주세요.</p>
            <div className="relative mb-10">
                    <InputField label="새 비밀번호" labelFor="newPassword" labelClassName="nexon-medium text-sm" type={showPassword ? "text" : "password"} id="newPassword" name="password" 
                        placeholder="영문+숫자+특수문자 조합으로 최소 8자 입력해주세요." className="text-[13px] text-left relative " onChange={(e)=>setPassword(e.target.value)} helperText={error.password}
                    >
                        <span className="w-5 h-5 cursor-pointer text-black4" onClick={handleShow}>
                                {showPassword ? <IoEyeOutline/> : <IoEyeOffOutline/> }
                        </span>
                    </InputField>
                    <ValidatePassword password={password} onValidationChange={()=>password}></ValidatePassword>
                </div>
                <div className="relative mb-10">
                    <InputField label="새 비밀번호 확인" labelFor="confirmPassword" labelClassName="nexon-medium text-sm" type={showPassword ? "text" : "password"} id="confirmPassword" name="password" 
                        placeholder="비밀번호를 다시 입력해주세요." className="text-[13px] text-left relative " onChange={(e)=>setPassword(e.target.value)} helperText={error.password}
                    >
                        <span className="w-5 h-5 cursor-pointer text-black4" onClick={handleShow}>
                                {showPassword ? <IoEyeOutline/> : <IoEyeOffOutline/> }
                        </span>
                    </InputField>
                </div>
            <FormButton type="button">비밀번호 변경</FormButton>
        </div>
    )
}

export default resetPassword;
