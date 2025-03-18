import { useNavigate } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";
import { useEmailVerification } from "../../hooks/auth/useEmailVerification";
import { FormButton, InputField } from "../login";
import { useState } from "react";
import ValidatePassword from "../password/ValidatePassword";
import axios from "axios";

const SignUpStep2 = ():JSX.Element=>{
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ code, setCode ] = useState("");
    const [ nickname, setNickname ] = useState("");
    const [ password, setPassword ] = useState<string>("");
    const [ passwordCheck, setPasswordCheck ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ githubUrl, setGithubUrl ] = useState("");

    // 이메일 인증
    const {
        sendEmailVerification,
        verifyEmailCode,
        isSending,
        isVerified,
        hasSentCode,
        errorMessage
    } = useEmailVerification();

    // 회원가입 API 호출
    const handleSignup = async () => {
        // 이메일 인증 유효성 검사
        if (!isVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        // 닉네임 입력 안했을 때
        if (!nickname) {
            alert("닉네임을 입력해주세요.")
            return;
        }

        // 비밀번호 입력 안했을 때
        if (!password) {
            alert("비밀번호를 입력해주세요.")
            return;
        }

        // 비밀번호 확인 입력 안했을 때
        if (!passwordCheck) {
            alert("비밀번호 확인을 입력해주세요.")
            return;
        }

        // 전화번호 입력 안했을 때
        if (!phone) {
            alert("전화번호를 입력해주세요.")
            return;
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("http://13.125.21.225:8080/member/register", {
                email,
                nickname,
                password,
                phone,
                githubUrl
            });

            if (response.data.message === "회원가입이 완료되었습니다.") {
                alert("회원가입이 완료되었습니다.");
                navigate("/login"); // 로그인페이지로 이동
            }
        } catch (e) {
            alert("회원가입 요청에 실패했습니다.");
        }
    }

    return(
        <div className="mb-6">
            <SignUpProcess currentStep={2}/>
            <div>


                {/* 이메일 입력 */}
                <div>
                    <label htmlFor="email" className="block mb-2 nexon-medium text-[15px] text-black4">이메일</label>
                    <div className="flex gap-2">
                        <InputField
                            type="email"
                            id="email"
                            value={email}
                            name="email"
                            className="w-full"
                            placeholder="이메일을 입력해주세요."
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isVerified} // 인증 완료 시 수정 불가능
                        />
                        {!isVerified ? (
                            <button
                                onClick={() => sendEmailVerification(email)}
                                className={`
                                    text-white text-sm px-5 rounded-[5px] nexon-medium h-[50px] whitespace-nowrap flex-shrink cursor-pointer
                                    ${ hasSentCode ? "bg-black6" : "bg-myBlue" }
                                `}
                                disabled={ isSending || isVerified }
                            >
                                { isSending ? "전송 중..." : hasSentCode ? "인증번호 재전송" : "인증번호 보내기" }
                            </button>
                        ):(
                            <button
                                className="text-myBlue border border-myBlue text-sm px-5 rounded-[5px] nexon-medium h-[50px] whitespace-nowrap flex-shrink"
                                disabled={true}
                            >
                                인증완료
                            </button>
                        )}
                        
                    </div>
                </div>
                {/* 인증번호 입력 필드(이메일 전송되었을 때만 표시) */}
                {hasSentCode && (
                    <div className="mt-5">
                        <label htmlFor="code" className="block mb-2 nexon-medium text-[15px] text-black4">인증번호</label>
                        <div className="flex gap-2">
                            <InputField
                                type="text"
                                id="code"
                                name="code"
                                value={code}
                                placeholder="인증번호를 입력해주세요."
                                className="w-full"
                                onChange={(e) => setCode(e.target.value)}
                                disabled={isVerified} // 인증 완료 시 수정 불가능
                            />
                            {!isVerified && (
                                <button
                                    onClick={() => verifyEmailCode(email, code)}
                                    className="bg-myBlue text-white text-sm px-5 rounded-[5px] nexon-medium h-[50px] whitespace-nowrap flex-shrink cursor-pointer"
                                >
                                    인증번호 확인
                                </button>
                            )}
                        </div>
                        { errorMessage && <p className="mt-1 text-sm text-myRed">{ errorMessage }</p> }
                    </div>
                )}


                {/* 닉네임 */}
                <div className="mt-5 mb-5">
                    <InputField
                        label="닉네임"
                        labelFor="nickname"
                        labelClassName="nexon-medium text-[15px] text-black4"
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={nickname}
                        placeholder="닉네임을 입력해주세요."
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                {/* 비밀번호 */}
                <div className="mb-5">
                    <InputField
                        label="비밀번호"
                        labelFor="password"
                        labelClassName="nexon-medium text-[15px] text-black4"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ValidatePassword password={password} />
                </div>
                {/* 비밀번호 확인 */}
                <div className="mb-5">
                    <InputField
                        label="비밀번호 확인"
                        labelFor="passwordCheck"
                        labelClassName="nexon-medium text-[15px] text-black4"
                        type="password"
                        id="passwordCheck"
                        name="passwordCheck"
                        value={passwordCheck}
                        placeholder="비밀번호를 다시 입력해주세요."
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </div>
                {/* 전화번호 */}
                <div className="mb-5">
                    <InputField
                        label="전화번호"
                        labelFor="phone"
                        labelClassName="nexon-medium text-[15px] text-black4"
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        placeholder="(-)없이 전화번호를 입력해주세요."
                        onChange={(e) => {
                            const val = e.target.value;
                            // 숫자만 허용하는 정규식 (0~9만 입력 가능)
                            if (/^\d*$/.test(val)) {
                                setPhone(val);
                            }
                        }}
                    />
                </div>
                {/* 깃허브 주소 */}
                <div className="mb-5">
                    <InputField
                        label="깃허브 주소"
                        labelFor="githubUrl"
                        labelClassName="nexon-medium text-[15px] text-black4"
                        type="text"
                        id="githubUrl"
                        name="githubUrl"
                        value={githubUrl}
                        placeholder="깃허브 주소를 입력해주세요."
                        onChange={(e) => setGithubUrl(e.target.value)}
                    />
                </div>



            </div>
            <FormButton
                type="button"
                onClick={handleSignup}
            >
                회원가입
            </FormButton>
        </div>
    )
}

export default SignUpStep2;