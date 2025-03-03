import { useState } from "react";
import { Link } from "react-router-dom";
import FormButton from "../form/FormButton";
import InputField from "../form/InputField";
import Modal from "../common/Modal";

const FindPassword = ():JSX.Element =>{
    const [ showPopup, setShowPopup ] = useState<boolean>(false);
    
    const handleSubmit = () =>{
        setShowPopup(true);
    }
    
    return(
        <div className="text-center w-[400px]">
            <h1 className="text-2xl nexon-bold py-12">비밀번호 찾기</h1>
            <p className="text-sm mb-10 text-black8"> 회원정보에 등록된 이메일을 입력해주세요 <br/>
                비밀번호 재설정 링크가 포함된 메일이 계정의 이메일 주소로 발송됩니다.
            </p>
            <InputField type="email" id="email" name="email" placeholder="이메일을 입력해주세요." className="text-[13px] mb-6"></InputField>
            <FormButton type="button" onClick={handleSubmit}>비밀번호 재설정 이메일 받기</FormButton>
            {showPopup && (
                <Modal>
                    <h2 className="text-[17px] nexon-bold">비밀번호 재설정 메일 발송 완료</h2>
                    <p className="text-[13px]">
                        입력한 이메일로 비밀번호 재설정 링크가 포함된 메일이 발송되었습니다. <br />
                        비밀번호 재설정 링크의 유효 시간은 10분입니다. <br />
                        메일함을 확인해주세요.
                    </p>
                    <Link to="/login">
                        <FormButton type="button" className="bg-myBlue !w-[110px] text-[13px]" >로그인 화면으로</FormButton>
                    </Link> 
                </Modal>
            )}
        </div>
    )
}

export default FindPassword;