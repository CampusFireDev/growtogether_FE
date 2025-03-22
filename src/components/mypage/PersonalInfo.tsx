import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField  from "../form/InputField";
import SelectMenu from "../form/SelectMenu";
import { LuImagePlus } from "react-icons/lu";
import { FormButton } from "../login";

const optionsList = ["React", "TypeScript", "Java", "Spring", ".NET"];
const PersonalInfo = ():JSX.Element =>{
    const navigate = useNavigate();

    



    
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
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


    const handleNext = () => {
        let newErrors: { [key: string]: string } = {};

        if(!nickname.trim()) newErrors.nickname = "닉네임을 입력해주세요."
        if (!email.trim()) newErrors.email = "이메일.";
        if(!password.trim()) newErrors.password = "비밀번호를 입력해주세요.";
        if (!phone.trim()) newErrors.phone = "전화번호를 입력해주세요.";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        setError({});
        navigate("/mypage");
    };

    return(
        <div className="">
            <strong className="block nexon-bold text-xl text-black4 mb-2">내 정보 수정</strong>
            <div className="border border-gray5 bg-white"></div>
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
            <div className="text-[13px] text-nowrap">
                
                <InputField label="닉네임" labelFor="nickname" labelClassName="nexon-medium text-sm mr-5" type="text" id="nickname" name="nickname" 
                    placeholder="닉네임을 입력해주세요."className="flex items-center" onChange={(e) => setNickname(e.target.value)} helperText={error.nickname}
                />
             
                <InputField label="이메일" labelFor="email" labelClassName="nexon-medium text-sm mr-5" type="email" id="email" name="email" 
                    placeholder="이메일 주소" className="flex items-center" onChange={(e) => setEmail(e.target.value)} helperText={error.email}
                />
                <div className="flex items-center gap-4 mb-6">
                    <InputField label="비밀번호" labelFor="password" labelClassName="nexon-medium text-sm mr-5" type="password" id="password" name="password" 
                        placeholder="비밀번호." className="flex flex-1 items-center !mb-0" onChange={(e)=>setPassword(e.target.value)} helperText={error.password}
                    />
                    <Link to="/resetpassword" > 
                        <FormButton type="button" className="!w-[100px] !h-[35px] text-xs rounded-full flex items-center justify-center">비밀번호 재설정</FormButton>
                    </Link>
                </div>
                <InputField label="전화번호" labelFor="phone" labelClassName="nexon-medium text-sm mr-5" type="tel" id="phone" name="phone" 
                    placeholder="전화번호를 입력해주세요." className="flex items-center" onChange={(e) => setPhone(e.target.value)} helperText={error.phone}
                />
                <InputField label="깃허브 주소" labelFor="git_url" labelClassName="nexon-medium text-sm mr-5" type="url" id="git_url" name="git_url" placeholder="깃허브 주소를 입력해주세요." className="flex items-center"/>
                <SelectMenu label="관심 기술 스택" labelClassName="nexon-medium text-sm mr-5" className="mb-6 flex items-center" placeholder="관심 기술 스택을 선택해주세요" options={optionsList}></SelectMenu>
            </div>

            <FormButton type="submit" className="!w-[100px] mb-6 text-xs nexon-medium mx-auto block" onClick={handleNext}>수정</FormButton>
        </div>
    )
};

export default PersonalInfo;