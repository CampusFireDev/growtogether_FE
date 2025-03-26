import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useMemberId from "../../hooks/auth/useMemberId";

const KakaoPayApproval = ():JSX.Element =>{
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const pgToken = searchParams.get("pg_token");
    const memberId = useMemberId();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (!pgToken) return;

        const approvePayment = async () => {
            try {
                const response = await axios.get(`/payment/approve?pg_token=${pgToken}`);
                console.log("결제 승인 응답:", response.data);
                alert("결제가 완료되었습니다!");
                const { tid } = response.data;
                if (!tid) {
                    throw new Error("tid 값이 응답에 없습니다.");
                }

                const approveResponse = await axios.post( "/payment/approve2",
                    {
                        id: memberId, 
                        tid: tid, 
                        pgToken: pgToken 
                    },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
                console.log("결제 승인 완료:", approveResponse.data);
                alert("결제가 완료되었습니다!");

                navigate("/mypage");

            } catch (error: any) {
                console.error("결제 승인 오류:", error.response || error.message);
                alert("결제 승인 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        approvePayment();

    },[pgToken, navigate, memberId]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {loading ? "결제 승인 중..." : "결제 승인 완료!"}
        </div>
    );

};

export default KakaoPayApproval;