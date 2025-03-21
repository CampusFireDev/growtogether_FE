import { Link } from "react-router-dom";
import useAuth from "../hooks/login/useAuth";
import useNotification from "../hooks/common/useNotification";
import Notification from "../components/mypage/Notification";

const Nav = ():JSX.Element =>{
    const { token } = useAuth(); // 토큰 상태 가져오기
    const {notificationCount} = useNotification();

    return (
        <div className="fixed top-0 left-0 w-full border-b border-[#e5e5e5] bg-white z-10">
            <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center pt-[20px] pb-[20px]">
                <div className="flex gap-6">
                    <Link to="/" className="text-xl nexon-bold">GrowTogether</Link>
                    <ul className="list-none items-center flex gap-4 text-base mx-4">
                        <li>
                            <Link to="/study" className="nexon-medium">스터디</Link>
                        </li>
                        <li>
                            <Link to="/bootcamp" className="nexon-medium">부트캠프</Link>
                        </li>
                        <li>
                            <Link to="/notice" className="nexon-medium">공지사항</Link>
                        </li>
                        <li>
                            <Link to="/mypage" className="nexon-medium">마이페이지</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center">
                    <ul className="list-none flex gap-[25px] text-base">
                        <li className="relative group">
                            <div className="absolute p-1 -top-1 -right-2 bg-black w-[17px] h-[17px] rounded-full text-[9px] flex items-center justify-center text-white nexon-medium">
                                {notificationCount}
                            </div>
                            <Link to={token ? "/mypage/notification" : "/login"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                                    <path d="M7 20.9394C7.79613 21.5989 8.84747 22 10 22C11.1525 22 12.2039 21.5989 13 20.9394M1.57109 17.5454C1.09677 17.5454 0.831858 16.7727 1.11877 16.3434C1.78453 15.3471 2.42712 13.886 2.42712 12.1265L2.45458 9.57693C2.45458 4.84003 5.83278 1 10 1C14.2286 1 17.6566 4.89659 17.6566 9.70327L17.6291 12.1265C17.6291 13.8981 18.2495 15.3672 18.8882 16.3638C19.164 16.7942 18.8984 17.5454 18.43 17.5454H1.57109Z" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            {token && 
                                (<div className="absolute hidden group-hover:block top-full right-0 z-20">
                                    <Notification isPopup={true} />
                                </div>)
                            }
                        </li>
                        <li>
                            <Link to={token ? "/mypage" : "/login"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M4.28125 19.375C4.78566 18.8101 7.14802 16.2104 7.84032 16.2104H15.1601C16.1633 16.2104 18.2112 18.3654 18.7188 19.125M22 11.5C22 17.299 17.299 22 11.5 22C5.70101 22 1 17.299 1 11.5C1 5.70101 5.70101 1 11.5 1C17.299 1 22 5.70101 22 11.5ZM15.2612 7.9212C15.2612 5.91799 13.5701 4.28125 11.5003 4.28125C9.43053 4.28125 7.7394 5.91799 7.7394 7.9212C7.7394 9.92442 9.43053 11.5612 11.5003 11.5612C13.5701 11.5612 15.2612 9.92442 15.2612 7.9212Z" stroke="#444444" strokeWidth="2"/>
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Nav;