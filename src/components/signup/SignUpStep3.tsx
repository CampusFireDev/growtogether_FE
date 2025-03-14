import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";
import InputField  from "../form/InputField";
import SelectMenu from "../form/SelectMenu";
import { LuImagePlus } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import ValidatePassword from "../password/ValidatePassword";

const optionsList = ["React", "TypeScript", "Java", "Spring", ".NET"]; // 기술스택 메뉴 선택 예시
const SignUpStep3 = ():JSX.Element=>{
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword ] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState<string>("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<{ [key: string]: string }>({});

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        console.log(e.target.files);
        if(file){
            const reader = new FileReader();
            reader.onloadend  = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleShow = () => {
        setShowPassword((prev) => !prev);
    };

    const handleNext = () => {
        let newErrors: { [key: string]: string } = {};
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!nickname.trim()) newErrors.nickname = "닉네임을 입력해주세요."
        if (!email.trim()) newErrors.email = "이메일.";
        if(!password.trim()) newErrors.password = "비밀번호를 입력해주세요.";
        if(!password.trim()) newErrors.confirmPassword = "비밀번호를 다시 입력해주세요.";
        if(!regex.test(password)) newErrors.password = "비밀번호를 영문+숫자+특수문자 조합으로 최소 8자 입력해주세요."
        if(password !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!phone.trim()) newErrors.phone = "전화번호를 입력해주세요.";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        setError({});
        navigate("/signup/step4");
    };

    return(
        <div className="">
            <SignUpProcess currentStep={3}/>
            <div className="mb-6 flex flex-col justify-center items-center">
                <div className="relative w-32 h-32 overflow-hidden rounded-full">
                    {profileImage ? <img src={profileImage} alt="Profile Img" className="w-full h-full object-cover"/>
                    :<img src="/images/profile.png" alt="Profile Img"/>}
                </div>
                <div className="translate-x-[30px] translate-y-[-27px] w-7 h-7 rounded-full bg-black9 cursor-pointer flex items-center justify-center">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={handleImage}/>
                    <LuImagePlus className="w-5 h-5 text-white"/>
                </div>
            </div>
            <div className="text-[13px]">
                <InputField label="닉네임 (필수)" labelFor="nickname" labelClassName="nexon-medium text-sm" type="text" id="nickname" name="nickname" 
                    placeholder="닉네임을 입력해주세요." onChange={(e) => setNickname(e.target.value)} helperText={error.nickname}
                />
                <InputField label="이메일" labelFor="email" labelClassName="nexon-medium text-sm" type="email" id="email" name="email" 
                    placeholder="이메일 주소" onChange={(e) => setEmail(e.target.value)} helperText={error.email}
                />
                <div className="relative mb-10">
                    <InputField label="비밀번호 (필수)" labelFor="password" labelClassName="nexon-medium text-sm" type={showPassword ? "text" : "password"} id="password" name="password" 
                        placeholder="영문+숫자+특수문자 조합으로 최소 8자 입력해주세요." className="relative " onChange={(e)=>setPassword(e.target.value)} helperText={error.password}
                    >
                        <span className="w-5 h-5 cursor-pointer text-black4" onClick={handleShow}>
                                {showPassword ? <IoEyeOutline/> : <IoEyeOffOutline/> }
                        </span>
                    </InputField>
                    <ValidatePassword password={password}></ValidatePassword>
                </div>
                <InputField label="비밀번호 확인 (필수)" labelFor="password" labelClassName="nexon-medium text-sm" type="password" id="password" name="password" 
                    placeholder="비밀번호를 입력해주세요" onChange={(e) => setConfirmPassword(e.target.value)} helperText={error.confirmPassword}
                />
                <InputField label="전화번호 (필수)" labelFor="phone" labelClassName="nexon-medium text-sm" type="tel" id="phone" name="phone" 
                    placeholder="전화번호를 입력해주세요." onChange={(e) => setPhone(e.target.value)} helperText={error.phone}
                />
                <InputField label="깃허브 주소 (선택)" labelFor="git_url" labelClassName="nexon-medium text-sm" type="url" id="git_url" name="git_url" placeholder="깃허브 주소를 입력해주세요."/>
                <SelectMenu label="관심 기술 스택 (선택)" labelClassName="nexon-medium text-sm" className="mb-6" placeholder="관심 기술 스택을 선택해주세요" options={optionsList}></SelectMenu>
            </div>

            <button type="submit" className="bg-black6 text-white text-xs w-full py-3 nexon-medium mb-6" onClick={handleNext}>다음</button>
        </div>
    )
};

export default SignUpStep3;
