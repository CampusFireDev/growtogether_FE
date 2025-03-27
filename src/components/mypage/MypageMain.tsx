import useMyPageInfo from "../../hooks/mypage/useMyPageInfo";

const MypageMain = (): JSX.Element | null => {
    const { info, loading, error } = useMyPageInfo();

    // API 요청 중이면 아무것도 렌더링하지 않음
    if (loading) return null; 

    // 로그인 에러가 발생하면 마이페이지 화면 자체가 보이지 않도록 설정
    if (error) return null; 

    return (
        <div>
            <img src="./images/mypageBanner.png" alt="" className="border border-gray5" />
            {/* 내 정보 */}
            <div className="py-7 px-7 mb-2 mt-3 border border-gray5 bg-white">
                <div>
                    <strong className="block nexon-medium text-lg">
                        {info?.nickName}
                    </strong>
                </div>
            </div>
            
        </div>
    )
}

export default MypageMain;