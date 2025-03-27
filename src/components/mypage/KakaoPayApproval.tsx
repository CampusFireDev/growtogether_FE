import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import useMemberId from "../../hooks/auth/useMemberId";
import useAuth from "../../hooks/login/useAuth";

const KakaoPayApproval = ():JSX.Element =>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const pgToken = searchParams.get("pg_token");
    // const memberId = useMemberId();
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);

    const headers = { 
        ...(token ? { Authorization: `${token}` } : {})
    };

    useEffect(()=>{
        if (!pgToken) return;
        const approvePayment = async () => {
            try {
                const response = await axios.get(`https://www.growtogether.store/payment/approve/callback?pg_token=${pgToken}`, {headers});
                console.log("결제 승인 응답:", response);
                // alert("결제가 완료되었습니다!");

                 // 로컬 스토리지에서 kakao_payment 가져오기
                 const paymentData = localStorage.getItem("kakao_payment");
                 if (!paymentData) {
                     throw new Error("paymentData 값이 응답에 없습니다.");
                 }
 
                 // paymentData가 null이 아닐 때만 JSON 파싱
                 const { tid, memberId: storedMemberId } = JSON.parse(paymentData);
 
                 // 'tid'와 'memberId'는 여기서 가져온 값으로 처리
                 if (!tid || !storedMemberId) {
                     throw new Error("tid 또는 memberId가 로컬 스토리지에 없습니다.");
                 }
 
                console.log("🟣", storedMemberId, tid, pgToken);

                const approveResponse = await axios.post(`https://www.growtogether.store/payment/approve2`,
                    {
                        id: storedMemberId, 
                        tid: tid, 
                        pgToken: pgToken 
                    },
                    {
                        headers: {
                            ...headers, 
                            // "Content-Type": "application/json", 
                        }
                    }
                );
                console.log("결제 승인 완료:", approveResponse.data);
                // alert("결제가 완료되었습니다!");

                localStorage.removeItem("kakao_payment");
                
            } catch (error: any) {
                console.error("결제 승인 오류:", error.response || error.message);
                // alert("결제 승인 중 오류 발생");
            } finally {
                setLoading(false);
                navigate("/mypage/point");
            }
        };

        approvePayment();

    },[pgToken]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {loading && "결제 승인 중..."}
        </div>
    );

};

export default KakaoPayApproval;