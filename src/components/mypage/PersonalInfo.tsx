import { FormButton, InputField } from "../login";
import useMyPageInfo from "../../hooks/mypage/useMyPageInfo";
import axios from "axios";
import useAuth from "../../hooks/login/useAuth";
import useMemberId from "../../hooks/auth/useMemberId";
import { useEffect, useRef, useState } from "react";
// import TechSelectBox from "../common/ui/TechSelectBox";
// import useBootcampSkillName from "../../hooks/bootcamp/useBootcampSkillList";

const PersonalInfo = ():JSX.Element => {
    // 내 정보 가져오기
    const { info } = useMyPageInfo();

    const [nickName, setNickName] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [phone, setPhone] = useState("");
    const [profileImgUrl, setProfileImgUrl] = useState("");
    const [selectedStacks, setSelectedStacks] = useState<string[]>([]);


    useEffect(() => {
        if (info) {
            setNickName(info.nickName || "");
            setGithubUrl(info.githubUrl || "");
            setPhone(info.phone || "");
            setProfileImgUrl(info.profileImageUrl || "");
            setSelectedStacks(info.skills || [])
        }
    }, [info]);

    // 로그인 한 유저 토큰 가져오기
    const { token } = useAuth();

    // 로그인한 유저 memberId 가져오기
    const memberId = useMemberId();

    // 기술스택 리스트 가져오기
    // const { skillName } = useBootcampSkillName();

    const fileInputRef = useRef<HTMLInputElement>(null);

    // 프로필 이미지 파일 업로드
    const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append("memberId", String(memberId)); // 실제 멤버 ID로 대체
        formData.append("profileImage", file);
        
        try {
            const res = await axios.put("https://www.growtogether.store/member/profile/image/update", formData, {
            headers: {
                Authorization: token, // 필요시
                "Content-Type": "multipart/form-data",
            },
            });
        
            if (res.data?.message?.includes("업데이트")) {
                alert("프로필 이미지가 변경되었습니다.");
                const newUrl = res.data?.profileImgUrl;
                if (newUrl) setProfileImgUrl(newUrl);
                window.location.reload();
            }
        } catch (err) {
            console.error("프로필 이미지 변경 실패", err);
            alert("이미지 업로드 실패");
        }
    };

    // 정보 수정
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateData = {
            nickName,
            githubUrl,
            phone,
            profileImgUrl,
            techStacks: selectedStacks,
        };

        try {
            await axios.put(
                "https://www.growtogether.store/api/mypage/update-my-Info",
                updateData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );
        
            alert("회원 정보가 수정되었습니다.");
            window.location.reload();
        } catch (err: any) {
            const error = err.response?.data?.error || "수정 실패";
            alert(`❌ ${error}`);
            console.error("회원 정보 수정 실패", err);
        }
    };
      



    return(
        <div className="">
            <strong className="block nexon-bold text-xl text-black4 mb-2">내 정보 수정</strong>
            <div className="border border-gray5 bg-white py-10 px-10">
                <form onSubmit={handleUpdate}>
                    <div className="relative w-[120px] h-[120px] m-auto">
                    <div className="w-full h-full rounded-full border border-gray5 overflow-hidden">
                        <img 
                            src={profileImgUrl || "/images/noImage80.png"} 
                            alt={`${info?.nickName || "사용자"} 프로필 이미지`} className="w-full"
                        />
                    </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 flex items-center justify-center w-[30px] h-[30px] bg-black6 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3.8001 3.08016V3.58016C3.97793 3.58016 4.14238 3.4857 4.23199 3.33209L3.8001 3.08016ZM4.9201 1.16016V0.660156C4.74226 0.660156 4.57781 0.754612 4.48821 0.908221L4.9201 1.16016ZM9.0801 1.16016L9.51199 0.908221C9.42238 0.754612 9.25793 0.660156 9.0801 0.660156V1.16016ZM10.2001 3.08016L9.76821 3.33209C9.85781 3.4857 10.0223 3.58016 10.2001 3.58016V3.08016ZM1.1001 11.2402V4.68015H0.100098V11.2402H1.1001ZM2.2001 3.58016H3.8001V2.58016H2.2001V3.58016ZM4.23199 3.33209L5.35199 1.41209L4.48821 0.908221L3.36821 2.82822L4.23199 3.33209ZM4.9201 1.66016H9.0801V0.660156H4.9201V1.66016ZM8.64821 1.41209L9.76821 3.33209L10.632 2.82822L9.51199 0.908221L8.64821 1.41209ZM10.2001 3.58016H11.8001V2.58016H10.2001V3.58016ZM12.9001 4.68016V11.2402H13.9001V4.68016H12.9001ZM12.9001 11.2402C12.9001 11.8477 12.4076 12.3402 11.8001 12.3402V13.3402C12.9599 13.3402 13.9001 12.4 13.9001 11.2402H12.9001ZM11.8001 3.58016C12.4076 3.58016 12.9001 4.07264 12.9001 4.68016H13.9001C13.9001 3.52036 12.9599 2.58016 11.8001 2.58016V3.58016ZM1.1001 4.68015C1.1001 4.07264 1.59258 3.58016 2.2001 3.58016V2.58016C1.0403 2.58016 0.100098 3.52036 0.100098 4.68015H1.1001ZM2.2001 12.3402C1.59258 12.3402 1.1001 11.8477 1.1001 11.2402H0.100098C0.100098 12.4 1.0403 13.3402 2.2001 13.3402V12.3402ZM8.9001 7.56016C8.9001 8.6095 8.04944 9.46016 7.0001 9.46016V10.4602C8.60172 10.4602 9.9001 9.16178 9.9001 7.56016H8.9001ZM7.0001 9.46016C5.95076 9.46016 5.1001 8.6095 5.1001 7.56016H4.1001C4.1001 9.16178 5.39847 10.4602 7.0001 10.4602V9.46016ZM5.1001 7.56016C5.1001 6.51081 5.95076 5.66016 7.0001 5.66016V4.66016C5.39847 4.66016 4.1001 5.95853 4.1001 7.56016H5.1001ZM7.0001 5.66016C8.04944 5.66016 8.9001 6.51081 8.9001 7.56016H9.9001C9.9001 5.95853 8.60172 4.66016 7.0001 4.66016V5.66016ZM11.8001 12.3402H2.2001V13.3402H11.8001V12.3402Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                    <div className="my-5">
                        <InputField
                            label="이메일"
                            labelFor="email"
                            labelClassName="nexon-medium text-[15px] text-black4"
                            type="email"
                            id="email"
                            name="email"
                            value={info?.email}
                            className="w-full"
                            disabled={true}
                        />
                    </div>
                    <div className="mb-5">
                        <InputField
                            label="닉네임"
                            labelFor="nickName"
                            labelClassName="nexon-medium text-[15px] text-black4"
                            type="text"
                            id="nickName"
                            name="nickName"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <InputField
                            label="전화번호"
                            labelFor="phoneNumber"
                            labelClassName="nexon-medium text-[15px] text-black4"
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <InputField
                            label="깃허브 주소"
                            labelFor="githubUrl"
                            labelClassName="nexon-medium text-[15px] text-black4"
                            type="text"
                            id="githubUrl"
                            name="githubUrl"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                        />
                    </div>
                    {/* <div className="mb-5">
                        <TechSelectBox availableStacks={skillName} selectedStacks={selectedStacks} onChangeSelectedStacks={setSelectedStacks} />
                    </div> */}
                    <FormButton
                        type="submit"
                        children="수정하기"
                        className="bg-myBlue"
                    />
                </form>
            </div>
        </div>
    )
};

export default PersonalInfo;