import { useNavigate } from "react-router-dom";
import FormButton from "../form/FormButton";

const Point = () : JSX.Element =>{
    const currentPoints = 82; 
    const navigate = useNavigate();

    const transactions = [
        {date: "2025-02-01", type: "적립", amount: 1000},
        {date: "2025-02-02", type: "사용", amount: -1000},
        {date: "2025-02-03", type: "충전", amount: 1000},
        {date: "2025-02-04", type: "적립", amount: 1000},
        {date: "2025-02-05", type: "적립", amount: 1000},
        {date: "2025-02-05", type: "적립", amount: 1000},
    ]
    const getAmount = (amount: number) =>amount > 0 ? "text-myBlue" : "text-[#FF0000]";

    const handleChargeClick = () =>{
        navigate("/mypage/point/charge", {state: {currentPoints}});
    }

    return (
        <>
            <div className="w-full flex justify-around items-center gap-60 h-30 p-5 rounded-[20px] shadow-[0px_10px_20px_rgba(0,0,0,0.25)] bg-white my-10 overflow-hidden">
                <div className="flex gap-3 items-center nexon-bold">
                    <div className="w-8 h-8 mx-3 flex justify-center items-center text-white rounded-full bg-black ">P</div>
                    <p className="nexon-bold">현재 사용가능한 포인트:</p>
                    <div className="flex items-center justify-end gap-1">
                        <p className="text-myGreen text-[28px]">{currentPoints}</p>
                        <p>P</p>
                    </div>
                </div>
                <div>
                    <button onClick={handleChargeClick}>
                        <FormButton type="button" className="bg-myGreen px-10 rounded-full nexon-medium">포인트 충전</FormButton>
                    </button>
                </div>
            </div>
            <div className="my-20 ">
                <p className="nexon-bold mb-2">포인트 내역</p>
                <div className="border-y-2 border-black9 nexon-medium">
                    {/* 테이블 헤더 */}
                    <div className="grid grid-cols-3 items-center h-[50px] border-b-1 border-gray9 bg-white5 text-black4 text-center">
                        <p>발생 일자</p> <p>거래 구분</p><p>금액</p>
                    </div>
                   
                    {transactions.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 items-center border-b border-gray5 h-[60px] text-center text-[14px] text-black4">
                            <p>{item.date}</p>
                            <p>{item.type}</p>
                            <p className={`${getAmount(item.amount)}`}>{item.amount > 0 ? `+${item.amount}` : item.amount}</p>
                        </div>
                    ))} 
                </div>
            </div>
        </>
    )
};

export default Point;