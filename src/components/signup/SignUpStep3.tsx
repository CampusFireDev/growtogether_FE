import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";
import InputField  from "../form/InputField";
import SelectMenu from "../form/SelectMenu";
import { LuImagePlus } from "react-icons/lu";

const optionsList = ["React", "TypeScript", "Java", "Spring", ".NET"]; // 기술스택 메뉴 선택 예시

const SignUpStep3 = ():JSX.Element=>{
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

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
    }

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
                    <LuImagePlus className=" w-5 h-5 text-white"/>
                </div>
            </div>
            <InputField label="닉네임 (필수)" labelFor="nickname" labelClassName="nexon-medium text-sm" type="text" id="nickname" name="nickname" placeholder="닉네임을 입력해주세요" className="text-[13px] mb-6" ></InputField>
            <InputField label="이메일" labelFor="email" labelClassName="nexon-medium text-sm" type="email" id="email" name="email" placeholder="이메일 주소" className="text-[13px] mb-6"></InputField>
            <InputField label="비밀번호 (필수)" labelFor="password" labelClassName="nexon-medium text-sm" type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" className="text-[13px] mb-6"></InputField>
            <InputField label="전화번호 (필수)" labelFor="phone" labelClassName="nexon-medium text-sm" type="tel" id="phone" name="phone" placeholder="전화번호를 입력해주세요" className="text-[13px] mb-6"></InputField>
            <InputField label="깃허브 주소 (선택)" labelFor="git_url" labelClassName="nexon-medium text-sm" type="url" id="git_url" name="git_url" placeholder="깃허브 주소를 입력해주세요" className="text-[13px] mb-6"></InputField>
            <SelectMenu label="관심 기술 스택 (선택)" labelClassName="nexon-medium text-sm" className="text-[13px] mb-6" placeholder="관심 기술 스택을 선택해주세요" options={optionsList}></SelectMenu>
            <button type="submit" className="bg-black6 text-white text-xs w-full py-3 nexon-medium mb-6" onClick={()=>navigate("/signup/step4")}>다음</button>
        </div>
    )
}

export default SignUpStep3;
