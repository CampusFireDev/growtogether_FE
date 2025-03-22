import axios from "axios";
import { useState } from "react";

interface KakoPayButtonProps {
    amount: number;
}

const KakaoPayButton = ({ amount }: KakoPayButtonProps) =>{
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () =>{
        if(!amount){
            alert("충전할 포인트를 선택해주세요.");
            return;
        }
        
        setIsLoading(true);
        try{
            const response = await axios.post (
                "https://open-api.kakaopay.com/online/v1/payment/ready",
                {
                    cid: "TC0ONETIME",
                    partner_order_id: "order_20250312_001",
                    partner_user_id: "user_001",
                    item_name: "포인트 충전",
                    quantity: 1,
                    total_amount: 2000,
                    tax_free_amount: 0,
                    approval_url: "http://localhost:5173/mypage",
                    cancel_url: "http://localhost:5173/mypage/point",
                    fail_url: "http://localhost:5173/mypage/point"
                },
                {   
                    headers: {
                        Authorization: "SECRET_KEY DEV8136D38F1315C04CD73192A5A4B07751C9E8A",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            const tid = response.data.tid;
            if (tid) {
                console.log("결제 ID:", tid);
            } else {
                console.error("tid 값이 응답에 없습니다.");
            }
            
        }
        catch (error: any) {
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