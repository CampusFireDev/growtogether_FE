import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import KakaoPayButton from "./KakaoPayButton";
const PointCharge = (): JSX.Element => {
    const location = useLocation();
    const { currentPoints } = location.state || {};

    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [customPoint, setCustomPoint] = useState<number | null>(null);
    const [payment, setPayment] = useState<number>(0);
    const pointList = [
        { amount: 0 },
        { amount: 1000 },
        { amount: 2000 },
        { amount: 3000 },
        { amount: 4000 },
        { amount: 5000 },
    ];
    
    const handlePointClick = (amount: number) => {
        setSelectedPoint(amount);
        if (amount === 0) setCustomPoint(0); // 직접 입력 선택 시 초기화
        setPayment(amount);
    };

    const handleCustomPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        const numberValue = value ? parseInt(value, 10) : null;
        setCustomPoint(numberValue);
        setSelectedPoint(0); // 직접 입력한 경우, 선택된 포인트를 0으로 설정
        setPayment(numberValue || 0);
    };

    // 충전 후 포인트 계산
    const totalPoints = (selectedPoint || customPoint || 0) + (currentPoints || 0);

    return (
        <div className="text-center w-full max-w-[800px] mx-auto">
            <h2 className="text-[20px] my-5 nexon-bold">포인트 충전하기</h2>
            <div className="border-2 border-gray5 rounded-[15px] text-[14px] nexon-medium">
                {pointList.map((item) => (
                    <div key={item.amount}
                        className={`grid grid-cols-2 items-center py-5 px-10 border-b last:border-b-0 border-gra text-black4 nexon-medium
                            ${selectedPoint === item.amount ? "bg-white5" : ""}`
                        }
                        onClick={() => handlePointClick(item.amount)}
                    >
                        <div className="flex gap-3 items-center cursor-pointer">
                            <FaRegCircleCheck className={selectedPoint === item.amount ? "text-myGreen" : "text-gray-400"} />
                            {item.amount !== 0 ? (
                                <p>{item.amount} P</p>
                            ) : (
                                <input type="number" placeholder="직접 입력하기" className="w-[120px] border-none focus:outline-none px-2 rounded" 
                                    value={customPoint ?? ""} onChange={handleCustomPointChange} onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </div>
                        {item.amount !== 0 && (
                            <p className="text-right">결제 금액 {item.amount.toLocaleString()} 원</p>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <p className="nexon-bold my-7 text-right mr-10 text-black4">
                    충전 후 포인트: <span className="text-myGreen">{totalPoints} P</span>
                </p>
            </div>

            {/* 카카오페이 결제 버튼 */}
            <div className="flex justify-center items-center my-5">
                <KakaoPayButton amount={payment} />
            </div>
        </div>
    );
};

export default PointCharge;