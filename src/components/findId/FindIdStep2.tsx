import { Link } from "react-router-dom";

const FindIdStep2 = ():JSX.Element => {
    return (
        <div className="w-[400px] mx-auto pt-[150px] pb-[100px]">
            <div className="flex justify-center">
                <svg id="Icons" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.707,8.707-7,7a1,1,0,0,1-1.414,0l-3-3a1,1,0,0,1,1.414-1.414L10,14.586l6.293-6.293a1,1,0,0,1,1.414,1.414Z"/>
                </svg>
            </div>
            <strong className="block text-2xl text-center mt-5">회원님의 아이디는 <br /><span className="nexon-bold">user123ssssss</span>입니다.</strong>
            <div>
                <Link to="/login" className="block w-full h-[55px] leading-[55px] bg-black text-white text-center rounded-[5px] mt-8">로그인</Link>
            </div>
        </div>
    )
}
export default FindIdStep2;