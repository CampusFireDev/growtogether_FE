import { Link } from "react-router-dom";

const Nav = ():JSX.Element =>{
    return (
        <div className="fixed top-0 w-full flex justify-between items-center mx-auto px-1 py-5 text-nowrap nexon-medium z-10">
            <div className="flex gap-6">
                <Link to="/" className="text-2xl nexon-bold">GrowTogether</Link>
                <ul className="list-none items-center flex gap-4 text-base mx-4">
                    <li>
                        <Link to="/study" >스터디</Link>
                    </li>
                    <li>
                        <Link to="/bootcamp">부트캠프</Link>
                    </li>
                    <li>
                        <Link to="/notice">공지사항</Link>
                    </li>
                    <li>
                        <Link to="/mypage">마이페이지</Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center">

            <ul className="list-none flex gap-4 text-base">
                <li className="border-2 rounded-full px-5 py-1">
                    <Link to="/signup">회원가입</Link>
                </li>
                <li className="border-2 rounded-full px-5 py-1">
                    <Link to="/login">로그인</Link>
                </li>
            </ul>
            </div>

        </div>
    )
}

export default Nav;