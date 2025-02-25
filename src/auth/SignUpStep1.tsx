import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignUpStep1 = ():JSX.Element=>{
    const [agreeTerms, setAgreeTerms] = useState<null | boolean>(null); //이용약관 동의 여부
    const [agreePrivacy, setAgreePrivacy] = useState<null | boolean>(null); //개인정보 보호 동의 여부
    const [agreeAll, setAgreeAll] = useState(false); // 모두 동의 여부
    const [canProceed, setCanProceed] = useState(false); // '다음' 단계 버튼 활성화

    // 이용약관 동의 처리
    const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTerms(e.target.id === "agree");
    };

    // 개인정보 동의 처리
    const handleAgreePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreePrivacy(e.target.id === "agree");
    };

    // 모두 동의 처리
    const handleAgreeAll = () => {
        setAgreeAll(prevAgreeAll => {
            const newAgreeAll = !prevAgreeAll;  // 이전 상태 값을 기반으로 새로운 값을 설정
            if (newAgreeAll) {
                setAgreeTerms(true);
                setAgreePrivacy(true);
            } else {
                setAgreeTerms(null);
                setAgreePrivacy(null);
            }
            return newAgreeAll;  // 상태를 업데이트 후 반환
        });
    };

    const canProceedNext = () =>{
        if(agreeTerms && agreePrivacy){
            setCanProceed(true);
        }else{
            setCanProceed(false);
        }
    }

    useEffect(()=>{
        canProceedNext();
    },[agreeTerms, agreePrivacy]);

    return(
        <div className="">
            <div className="mb-6">
                <div className="flex justify-between">
                    <h2 className="nexon-bold">이용약관</h2>
                    <div className="flex gap-4 items-center text-sm nexon">
                        <label htmlFor="agree">
                            <input type="radio" id="agree" name="terms" checked={agreeTerms === true} onChange={handleAgreeTermsChange} className="accent-black mr-1"/>
                            동의
                        </label>
                        <label htmlFor="disagree">
                            <input type="radio" id="disagree" name="terms" checked={agreeTerms === false} onChange={handleAgreeTermsChange} className="accent-black mr-1"/>
                            비동의
                        </label>
                    </div>
                </div>
                <div className="p-2 border border-zinc-300 rounded-xl bg-zinc-100 nexon text-xs text-zinc-700 max-h-[250px] overflow-y-auto whitespace-pre-line">
                    제 1 조 (목적)
                    이 약관은 [회사명] (이하 "회사")가 제공하는 [서비스명] (이하 "서비스") 이용에 관한 조건을 규정합니다.
                    <br />
                    <br />
                    제 2 조 (약관의 효력 및 변경)
                    본 약관은 서비스 이용자가 가입을 완료하는 시점에 효력이 발생하며, 변경 시 서비스 화면에 공지됩니다.
                    <br />
                    <br />
                    제 3 조 (서비스 제공 및 이용)
                    회사는 [서비스명]을 제공하며, 이용자는 이를 이용함에 있어 법령을 준수해야 합니다.
                    <br />
                    <br />
                    제 4 조 (회원가입)
                    회원 가입 시 제공하는 정보는 정확해야 하며, 이용자는 이를 변경해야 할 경우 즉시 수정해야 합니다.
                    <br />
                    <br />
                    제 5 조 (회원의 의무)
                    이용자는 서비스를 정상적으로 이용하기 위해 약관을 준수하고, 타인의 권리를 침해하지 않아야 합니다.
                    <br />
                    <br />
                    제 6 조 (서비스 이용의 제한 및 중지)
                    회사는 불법적인 활동이나 약관 위반 시 서비스 이용을 제한하거나 중지할 수 있습니다.
                    <br />
                    <br />
                    제 7 조 (개인정보 보호)
                    회사는 이용자의 개인정보를 보호하며, 개인정보 처리 방침에 따라 관리합니다. (자세한 사항은 개인정보 처리 방침 참조)
                    <br />
                    <br />
                    제 8 조 (서비스 요금 및 결제)
                    서비스는 기본적으로 무료로 제공되며, 유료 서비스의 경우 요금은 별도 안내됩니다.
                    <br />
                    <br />
                    제 9 조 (개인정보의 제3자 제공)
                    회사는 이용자의 개인정보를 제3자에게 제공하지 않으며, 법적 의무가 있을 경우에만 제공됩니다.
                    <br />
                    <br />
                    제 10 조 (책임의 한계)
                    회사는 서비스 제공에 있어 발생하는 문제에 대해 제한적인 책임만을 지며, 불가항력적인 사유에 대해서는 책임을 지지 않습니다.
                    <br />
                    <br />
                    제 11 조 (관할 법원)
                    본 약관에 관한 분쟁은 [회사 주소지]의 법원을 제1심 법원으로 합니다.
                    <br />
                    <br />
                    [시행일자] : [시행일자]
                </div>
            </div>



            <div className="mb-6">
                <div className="flex justify-between">
                    <h2 className="nexon-bold">개인정보보호</h2>
                    <div className="flex gap-4 items-center text-sm nexon">
                        <label htmlFor="agreePrivacy">
                            <input type="radio" id="agree" name="privacy" checked={agreePrivacy === true} onChange={handleAgreePrivacyChange} className="accent-black mr-1"/>
                            동의
                        </label>
                        <label htmlFor="disagreePrivacy">
                            <input type="radio" id="disagree" name="privacy" checked={agreePrivacy === false} onChange={handleAgreePrivacyChange} className="accent-black mr-1"/>
                            비동의
                        </label>
                    </div>
                </div>
                <div className="p-2 border border-zinc-300 rounded-xl bg-zinc-100 nexon text-xs text-zinc-700 max-h-[250px] overflow-y-auto whitespace-pre-line">
                    1. 개인정보 수집 및 이용 목적
                    우리는 회원가입을 위해 최소한의 개인정보를 수집합니다. 수집된 개인정보는 서비스 제공 및 관리, 고객 지원, 통계 분석, 이벤트 안내 등 본 서비스의 목적에만 사용됩니다.
                    <br />
                    <br />
                    2. 수집하는 개인정보 항목
                    필수 항목: 이름, 이메일, 전화번호 등
                    선택 항목: 주소, 프로필 사진 등
                    <br />
                    <br />
                    3. 개인정보 보유 및 이용 기간
                    수집된 개인정보는 회원 탈퇴 또는 서비스 종료 시까지 보유됩니다. 다만, 관련 법령에 따라 보존해야 하는 경우에는 해당 기간 동안 보관될 수 있습니다.
                    <br />
                    <br />
                    4. 개인정보의 제3자 제공
                    원칙적으로 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 법적 의무가 있는 경우 또는 서비스 제공을 위해 필요한 경우에는 예외가 있을 수 있습니다.
                    <br />
                    <br />
                    5. 개인정보 보호를 위한 안전 조치
                    사용자의 개인정보는 암호화된 방식으로 안전하게 보호됩니다. 개인정보 접근 권한이 제한된 직원만이 접근할 수 있도록 관리합니다.
                    <br />
                    <br />
                    6. 사용자의 권리
                    사용자는 언제든지 본인의 개인정보에 접근하고 수정할 수 있습니다. 또한, 개인정보의 삭제를 요청할 수 있습니다. 이를 위해 고객센터로 문의 바랍니다.
                    <br />
                    <br />
                    7. 동의 거부 권리
                    개인정보 제공에 대한 동의를 거부할 수 있습니다. 다만, 필수 항목에 대한 동의를 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="agreeAll">
                    <input type="checkbox" onClick={handleAgreeAll} className="accent-black mr-1"/>
                    모두 동의
                </label>
            </div>

            <Link to="/signup/step2">
                <button className={`px-24 py-3 nexon-medium  text-white 
                    ${canProceed ? "bg-blue-500" : "bg-zinc-500 cursor-not-allowed"}`} disabled={!canProceed}>
                    다음
                </button>
            </Link>
        </div>
    )
}

export default SignUpStep1;



