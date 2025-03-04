import { useNavigate } from "react-router-dom";
import SignUpProcess from "./SignUpProcess";
import UserAuth from "../common/auth/UserAuth";

const SignUpStep2 = ():JSX.Element=>{
    const navigate = useNavigate();
    return(
        <div className="mb-6">
            <SignUpProcess currentStep={2}/>
            <UserAuth showBtn={false}/>
            <button className="bg-black6 text-white text-xs w-full py-3 nexon-medium" onClick={()=>navigate("/signup/step3")}>다음</button>
        </div>
    )
}

export default SignUpStep2;