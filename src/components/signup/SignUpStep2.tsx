import { useNavigate } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";
import { useEmailVerification } from "../../hooks/auth/useEmailVerification";
import { FormButton, InputField } from "../login";
import { useState } from "react";
import ValidatePassword from "../password/ValidatePassword";
import axios from "axios";

interface PasswordCriteria {
    length: boolean;
    letter: boolean;
    number: boolean;
    specialChar: boolean;
}

const SignUpStep2 = ():JSX.Element=>{
    const navigate = useNavigate();

    // 회원가입 폼 상태
    const [ formData, setFormData ] = useState({
        email: "",
        verificationCode: "",
        nickName: "",
        password: "",
        passwordCheck: "",
        phone: "",
        githubUrl: ""
    });

    // 비밀번호 조건 상태
    const [ passwordCriteria, setPasswordCriteria ] = useState<PasswordCriteria>({
        length: false,
        letter: false,
        number: false,
        specialChar: false
    });

    // 이메일 인증 상태
    const {
        sendEmailVerification,
        verifyEmailCode,
        isSending,
        isVerified,
        hasSentCode,
        errorMessage
    } = useEmailVerification();

    // 입력 필드 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // `ValidatePassword`에서 전달받은 검증 상태를 업데이트
    const handleValidationChange = (criteria: PasswordCriteria) => {
        setPasswordCriteria(criteria);
    };

    // 회원가입 조건 검사
    const validateForm = () => {
        const { email, verificationCode, nickName, password, passwordCheck, phone } = formData;

        if (!passwordCriteria.length || !passwordCriteria.letter || !passwordCriteria.number || !passwordCriteria.specialChar) {
            alert("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
            return false;
        }

        if (!isVerified) {
            alert("이메일 인증을 완료해주세요.");
            return false;
        }

        if (!nickName) {
            alert("닉네임을 입력해주세요.");
            return false;
        }

        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return false;
        }

        if (!passwordCheck) {
            alert("비밀번호 확인을 입력해주세요.");
            return false;
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }

        if (!phone) {
            alert("전화번호를 입력해주세요.");
            return false;
        }

        return true;
    };

    // 회원가입 API 호출
    const handleSignup = async () => {
        if (!validateForm()) return;

        try {
            const response = await axios.post("http://13.125.21.225:8080/member/register", formData);

            if (response.data.message === "회원가입이 완료되었습니다.") {
                localStorage.setItem("nickName", formData.nickName);
                navigate("/signup/step3"); // 회원가입 완료 페이지로 이동
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
                            name="email"
                            value={formData.email}
                            className="w-full"
                            placeholder="이메일을 입력해주세요."
                            onChange={handleInputChange}
                            disabled={isVerified} // 인증 완료 시 수정 불가능
                        />
                        {!isVerified ? (
                            <button
                                onClick={() => sendEmailVerification(formData.email)}
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
                                id="verificationCode"
                                name="verificationCode"
                                value={formData.verificationCode}
                                placeholder="인증번호를 입력해주세요."
                                className="w-full"
                                onChange={handleInputChange}
                                disabled={isVerified} // 인증 완료 시 수정 불가능
                            />
                            {!isVerified && (
                                <button
                                    onClick={() => verifyEmailCode(formData.email, formData.verificationCode)}
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
                        labelFor="nickName"
                        labelClassName="nexon-medium text-[15px] text-black4"
                        type="text"
                        id="nickName"
                        name="nickName"
                        value={formData.nickName}
                        placeholder="닉네임을 입력해주세요."
                        onChange={handleInputChange}
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
                        value={formData.password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={handleInputChange}
                    />
                    <ValidatePassword password={formData.password} onValidationChange={handleValidationChange} />
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
                        value={formData.passwordCheck}
                        placeholder="비밀번호를 다시 입력해주세요."
                        onChange={handleInputChange}
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
                        value={formData.phone}
                        placeholder="(-)없이 전화번호를 입력해주세요."
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                                setFormData({ ...formData, phone: val });
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
                        value={formData.githubUrl}
                        placeholder="깃허브 주소를 입력해주세요."
                        onChange={handleInputChange}
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