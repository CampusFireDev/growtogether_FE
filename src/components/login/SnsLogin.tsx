import KakaoLogin from "./KakaoLogin";

const SnsLogin = (): JSX.Element => {
    return (
        <div className="w-full mt-12">
            {/* 타이틀 영역 */}
            <div className="flex items-center justify-center gap-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="text-sm nexon">SNS 로그인</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* SNS 버튼 */}
            <div className="flex justify-center mt-5">
                <KakaoLogin />
            </div>
        </div>
    )
}
export default SnsLogin;