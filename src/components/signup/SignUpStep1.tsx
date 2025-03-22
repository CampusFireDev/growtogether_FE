import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import SignUpStep4 from "./SignUpStep4";
import RadioInput from "../form/RadioInput";
import CheckboxInput from "../form/CheckboxInput";
import { FormButton } from "../login";
const SignUpStep1 = ():JSX.Element=>{
    const navigate = useNavigate();
    const { step } = useParams(); 
    
    // 기본 값을 null로 설정하여 처음에는 아무것도 체크되지 않도록 함
    const [agreeTerms, setAgreeTerms] = useState<null | boolean>(null); // 이용약관 동의 여부
    const [agreePrivacy, setAgreePrivacy] = useState<null | boolean>(null); //개인정보 보호 동의 여부
    const [agreeAll, setAgreeAll] = useState(false); // 모두 동의 여부
    const [canProceed, setCanProceed] = useState(false); // '다음' 단계 버튼 활성화

    // 이용약관 동의 처리
    const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isAgreed = e.target.id === "agree";
        setAgreeTerms(isAgreed);
        setAgreeAll(isAgreed && agreePrivacy === true); // 하나라도 비동의면 전체동의 해제
        updateCanProceed(isAgreed, agreePrivacy);
    }

    // 개인정보 보호 동의 처리
    const handleAgreePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isAgreed = e.target.id === "agreePrivacy"; 
        setAgreePrivacy(isAgreed);
        setAgreeAll(isAgreed && agreeTerms === true); // 하나라도 비동의면 전체동의 해제
        updateCanProceed(agreeTerms, isAgreed);
    }

    // 모두 동의 처리
    const handleAgreeAll = () => {
        const newAgreeAll = !agreeAll;
        setAgreeAll(newAgreeAll);
        setAgreeTerms(newAgreeAll);
        setAgreePrivacy(newAgreeAll);
        setCanProceed(newAgreeAll);
    };

    // 다음 버튼 활성화 여부 업데이트
    const updateCanProceed = (terms: boolean | null, privacy: boolean | null) => {
        setCanProceed(terms === true && privacy === true);
    };

    // ✅ "다음" 버튼 클릭 시 경고 메시지 확인
    const handleNextStep = () => {
        if (agreeTerms !== true || agreePrivacy !== true) {
            alert("모든 약관에 동의해야 다음 단계로 진행할 수 있습니다.");
            return;
        }
        navigate("/signup/step2");
    };

    if (step === "step2") {
        return <SignUpStep2 />; 
    }
    else if (step === "step3") {
        return <SignUpStep3 />;
    }
    else if (step === "step4") {
        return <SignUpStep4 />;
    }


    return(
        <div className="text-center">
            <SignUpProcess currentStep={1}/>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="nexon-medium text-lg text-black4">이용약관</h2>
                    <div className="flex gap-4 items-center text-sm text-black4">
                        <RadioInput
                            id="agree"
                            name="terms"
                            value="agree"
                            label="동의"
                            checked={agreeTerms === true}
                            onChange={handleAgreeTermsChange}
                        />
                        <RadioInput
                            id="disagree"
                            name="terms"
                            value="disagree"
                            label="비동의"
                            checked={agreeTerms === false}
                            onChange={handleAgreeTermsChange}
                        />
                    </div>
                </div>
                <div className="p-2 border border-gray9 rounded-[5px] bg-white9 text-xs text-black6 max-h-[250px] h-full overflow-y-auto whitespace-pre-line">
                    이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />이용약관 동의 내용<br />
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="nexon-medium text-lg text-black4">개인정보보호</h2>
                    <div className="flex gap-4 items-center text-sm text-black4">
                        <RadioInput
                            id="agreePrivacy"
                            name="privacy"
                            value="agreePrivacy"
                            label="동의"
                            checked={agreePrivacy === true}
                            onChange={handleAgreePrivacyChange}
                        />
                        <RadioInput
                            id="disagreePrivacy"
                            name="privacy"
                            value="disagreePrivacy"
                            label="비동의"
                            checked={agreePrivacy === false}
                            onChange={handleAgreePrivacyChange}
                        />
                    </div>
                </div>
                <div className="p-2 border border-gray9 rounded-[5px] bg-white9 text-xs text-black6 max-h-[250px] overflow-y-auto whitespace-pre-line">
                   개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />개인정보보호 내용<br />
                </div>
            </div>

            <div className="flex justify-center mb-6 text-black4">
                <CheckboxInput
                    id="checkAll"
                    name="checkAll"
                    value="checkAll"
                    label="전체 동의"
                    checked={agreeAll}
                    onChange={handleAgreeAll}
                />
            </div>
            
            <FormButton
                type="button"
                onClick={handleNextStep}
                className={`${canProceed ? "bg-myBlue" : "bg-black6 cursor-not-allowed"}`}
            >
                다음
            </FormButton>
        </div>
    )
}

export default SignUpStep1;