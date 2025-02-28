import { Link } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";

const SignUpStep4 = ():JSX.Element=>{
    return(
        <div className="">
            <SignUpProcess currentStep={4}/>
            <div className="flex flex-col justify-center items-center gap-5">
                <img src="/images/check.png" alt="complete" className="my-7"/>
                <p className="text-2xl nexon-medium">회원가입이 <b>완료</b>되었습니다.</p>
                <p className="text-lg text-center mb-5"><b>닉네임</b> 님의 회원가입을 축하합니다. <br/>알차고 유익한 정보로 찾아뵙겠습니다</p>
                
                <div className="flex mb-10 w-full justify-between gap-6">
                    <Link to="/" className="flex-1">
                        <button  className="w-full bg-white text-black text-xs py-3 nexon-medium border-2 border-black8">홈으로</button>
                    </Link>
                    <Link to="/login" className="flex-1">
                        <button  className="w-full bg-black6 text-white text-xs py-3 nexon-medium border-2 border-black6">로그인</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpStep4;