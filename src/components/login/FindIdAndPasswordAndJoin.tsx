import { Link } from "react-router-dom";

const FindIdAndPassword = (): JSX.Element => {
    return (
        <ul className="flex items-center justify-center mt-4">
            <li><Link to="/findId" className="nexon text-sm">아이디 찾기</Link></li>
            <li className="text-sm ml-2 mr-2">|</li>
            <li><Link to="/findPassword" className="nexon text-sm">비밀번호 찾기</Link></li>
            <li className="text-sm ml-2 mr-2">|</li>
            <li><Link to="/signup" className="nexon text-sm">회원가입</Link></li>
        </ul>
    )
}
export default FindIdAndPassword;