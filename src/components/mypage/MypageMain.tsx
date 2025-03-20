import useMyPageInfo from "../../hooks/mypage/useMyPageInfo";

const MypageMain = (): JSX.Element => {
    const { info } = useMyPageInfo();

    return (
        <div>
            {/* 내 정보 */}
            <div className="py-7 px-7 border border-gray5 bg-white">
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