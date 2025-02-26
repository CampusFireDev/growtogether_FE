import { useState } from "react";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";

const SignUp = ():JSX.Element=>{
    const [currentStep, setCurrentStep] = useState(1);

    const renderStep = () =>{
        switch(currentStep){
            case 1:
                return <SignUpStep1 setCurrentStep={setCurrentStep}/>;
            case 2: 
                return <SignUpStep2 setCurrentStep={setCurrentStep}/>;
            case 3:
                return <SignUpStep3 setCurrentStep={setCurrentStep}/>;
            default:
                return <SignUpStep1 setCurrentStep={setCurrentStep}/>;
        }
    }
    return(
        <div className="w-full">
            
            <div className="text-center max-w-[700px] mx-auto">
                <h1 className="text-2xl nexon-bold py-12">회원가입</h1>
                <div className="relative flex justify-center items-center mb-14">

                    {[
                        {step: 1, label: "약관동의"},
                        {step: 2, label: "본인인증"},
                        {step: 3, label: "정보입력"},
                        {step: 4, label: "가입완료"},
                    ].map(({step, label}, index, array) => (
                        <div key={step} className="relative flex items-center"> 
                        
                            <div className= "w-12 h-12 rounded-full bg-zinc-300 flex items-center justify-center" >
                                <p className={`${currentStep === step ? "nexon-bold text-xl":"nexon-bold text-xl text-zinc-500"}`}>{step}</p>
                            </div>
                            <p className={`absolute top-14 text-nowrap nexon-medium text-sm ${currentStep === step ? "text-black": "text-zinc-500" }`}>
                                {label}
                            </p>
                            { index < array.length - 1 && <div className="w-16 h-0.5 bg-zinc-300"></div>}
                        </div>
                    ))}

                </div>

                {renderStep()}

            </div>
        </div>
    )
}

export default SignUp;

