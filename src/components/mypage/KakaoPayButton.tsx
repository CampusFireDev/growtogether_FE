import axios from "axios";
import { useState } from "react";
import useMemberId from "../../hooks/auth/useMemberId";

interface KakoPayButtonProps {
    amount: number;
}

const KakaoPayButton = ({ amount }: KakoPayButtonProps) =>{
    const [isLoading, setIsLoading] = useState(false);
    const memberId = useMemberId();
    
    const handlePayment = async () =>{
        if(!amount){
            alert("충전할 포인트를 선택해주세요.");
            return;
        }
        
        setIsLoading(true);
        try{
            const response = await axios.post ("/payment/ready/callback",
                {
                    id: memberId,
                    name: "포인트 충전",
                    totalPrice: amount
                },
                {headers: {"Content-Type": "application/json"}}
            );
   
            const { tid, next_redirect_pc_url } = response.data;
 
            if (tid && next_redirect_pc_url) {
                // 결제 준비 완료 후 카카오페이 결제 창으로 리디렉션
                // localStorage.setItem("kakao_tid", tid);
                localStorage.setItem("kakao_payment", JSON.stringify({ tid, memberId }));
                window.location.href = next_redirect_pc_url;
            } else {
                console.error("tid 또는 next_redirect_pc_url이 응답에 없습니다.");
            }
            
        } catch (error: any) {
            console.error("결제 오류:", error.response || error.message);
            alert("결제 요청 중 오류 발생");
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <button onClick={handlePayment} disabled={isLoading}
            className="bg-[#FEE500] flex justify-center items-center w-[300px] h-[55px] p-2 rounded-md text-black font-bold"
        >
            <img src="/images/kakao_logo.png" className="w-10" alt="카카오페이 로고" />
            <p className="ml-2">{isLoading ? "결제 요청 중..." : "카카오페이로 결제하기"}</p>
        </button>
    );
};

export default KakaoPayButton;