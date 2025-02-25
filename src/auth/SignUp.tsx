import { useState } from "react";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";

const SignUp = ():JSX.Element=>{
    const [currentStep, setCurrentStep] = useState(1);

    const renderStep = () =>{
        switch(currentStep){
            case 1:
                return <SignUpStep1 />;
            case 2: 
                return <SignUpStep2 />;

            default:
                return <SignUpStep1 />;
        }
    }
    return(
        <div className="w-full">
            
            <div className="text-center max-w-[700px] mx-auto">
                <h1 className="text-2xl nexon-bold py-12">회원가입</h1>

                <div className="relative flex justify-center items-center mb-14">
                    {/* Step 1 */}
                    <div className="relative flex items-center">
                        <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
                            <p className="nexon-bold text-xl">1</p>
                        </div>
                        <p className="absolute top-14 text-nowrap nexon-medium text-sm">약관동의</p>
                    </div>

                    <div className="w-16 h-0.5 bg-zinc-300"></div>

                    {/* Step 2 */}
                    <div className="relative flex items-center">
                        <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
                            <p className="nexon-bold text-xl text-zinc-500">2</p>
                        </div>
                        <p className="absolute top-14 text-nowrap nexon-medium text-sm text-zinc-500">본인인증</p>
                    </div>
                    
                    <div className="w-16 h-0.5 bg-zinc-300"></div>

                    {/* Step 3 */}
                    <div className="relative flex items-center">
                        <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
                            <p className="nexon-bold text-xl text-zinc-500">3</p>
                        </div>
                        <p className="absolute top-14 text-nowrap nexon-medium text-sm text-zinc-500">정보입력</p>
                    </div>
                    
                    <div className="w-16 h-0.5 bg-zinc-300"></div>
                    
                    {/* Step 4 */}
                    <div className="relative flex items-center">
                        <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
                            <p className="nexon-bold text-xl text-zinc-500">4</p>
                        </div>
                        <p className="absolute top-14 text-nowrap nexon-medium text-sm text-zinc-500">가입완료</p>
                    </div>
                    

                </div>
                {/* <SignUpStep1 /> */}
                {renderStep()}

                {/* {currentStep === 1 && (
                    <button
                        className="mt-4 px-24 py-3 nexon-medium text-white bg-blue-500"
                        onClick={() => setCurrentStep(2)}>
                        다음
                    </button>
                )} */}

            </div>
        </div>
    )
}

export default SignUp;

