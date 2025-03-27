import axios from "axios";
import { useState } from "react";

export const useEmailVerification = () => {
    const [ isSending, setIsSending ] = useState(false); // 이메일 인증번호 전송 중 상태
    const [ isVerified, setIsVerified ] = useState(false); // 인증 완료 여부
    const [ hasSentCode, setHasSentCode ] = useState(false); // 인증번호가 전송되었는지 여부
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null); // 에러메시지

    // 이메일 인증번호 보내기
    const sendEmailVerification = async (email: string) => {

        // 이메일 입력 안했을 때
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        setIsSending(true); // 이메일 전송 중 상태 변경

        const formData = new FormData();
        formData.append("email", email);

        try {
            await axios.post("https://www.growtogether.store/api/email/send", formData);
            alert("인증번호가 이메일로 전송되었습니다.");
            setHasSentCode(true); // 인증번호 전송 완료 상태 변경
        } catch (e) {
            console.error("이메일 인증 오류: ", e);
            setErrorMessage("이메일 인증 요청에 실패했습니다.");
        } finally {
            setIsSending(false);
        }
    }

    // 이메일 인증번호 확인
    const verifyEmailCode = async (email: string, code: string) => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("code", code);

        try {
            const response = await axios.post("https://www.growtogether.store/api/email/verify", formData);

            if (response.data.message === "이메일 인증이 완료되었습니다.") {
                setIsVerified(true);
                alert("이메일 인증이 완료되었습니다.");
            } else {
                setErrorMessage("인증번호가 일치하지 않습니다.");
            }
        } catch (error) {
            setErrorMessage("인증번호 확인에 실패했습니다.");
        }
    };

    return {
        sendEmailVerification,
        verifyEmailCode,
        isSending,
        isVerified,
        hasSentCode,
        errorMessage
    };
};
