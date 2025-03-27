import { Link } from "react-router-dom";
import ButtonStyle1 from "../common/ui/ButtonStyle1";
import usePointHistory from "../../hooks/mypage/point/usePointHistory";
import useMyPageInfo from "../../hooks/mypage/useMyPageInfo";

const Point = () : JSX.Element =>{
    const { points, availablePoints } = usePointHistory();

    // 회원 정보 가져오기
    const { info } = useMyPageInfo();
    return (
        <>
            <strong className="block nexon-bold text-xl text-black4 mb-2">포인트</strong>
            <div className="flex flex-col border border-gray5 bg-white min-h-[490px] max-h-122">
                <div className="flex items-center justify-between py-7 px-7 ">
                    <div>
                        <em className="block nexon text-black6 mr-2 mb-1">
                            현재 사용 가능한 포인트
                        </em>
                        <strong className="nexon-bold text-3xl text-black4">
                            <span className="text-myBlue">{availablePoints ?? info?.points}</span>P
                        </strong>
                    </div>
                    <Link to="/mypage/point/charge" state={{ currentPoints: info?.points }}>
                        <ButtonStyle1
                            type="button"
                            label="포인트 충전"
                            className="bg-myBlue text-white cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="overflow-x-hidden overflow-y-scroll">
                    {points?.map((point, index) => (
                        <div key={`${point.date}-${index}`} className={`flex items-center justify-between px-5 py-5 border-t border-gray5 ${index === points.length -1 && "border-b border-gray5"}`}>
                            <div>
                                <strong className="block text-lg nexon-medium text-black4">
                                    {point.type === "REWARD" ? "적립" : point.type === "USE" ? "사용" : "충전"}
                                </strong>
                                <span className="block text-sm text-black9">{ point.date }</span>
                            </div>
                            <strong className="block text-lg nexon-bold text-myBlue">{ point.amount }</strong>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
    )
};

export default Point;