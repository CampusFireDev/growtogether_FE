interface SignUpProcessProps {
    currentStep: number;
}

const SignUpProcess = ({ currentStep } : SignUpProcessProps):JSX.Element=>{
 
    return(
        <div className="text-center w-full">
            <h1 className="text-2xl text-black4 nexon-bold pb-12">회원가입</h1>
            <div className="relative flex justify-center items-center mb-14">
                {[
                    {step: 1, label: "약관동의"},
                    {step: 2, label: "정보입력"},
                    {step: 3, label: "정보입력"},
                    ].map(({step, label}, index, array) => (
                    <div key={step} className="relative flex items-center mb-4"> 
                        <div className={`w-12 h-12 rounded-full  flex items-center justify-center ${currentStep === step ? "bg-myBlue":" bg-gray5"}`} >
                            <p className={`nexon-bold text-xl ${currentStep === step ? "text-white":" text-black6"}`}>{step}</p>
                        </div>
                        <p className={`absolute top-14 text-nowrap nexon-medium text-sm ${currentStep === step ? "text-myBlue": "text-black6"}`}>
                            {label}
                        </p>
                        {index < array.length - 1 && <div className="w-16 h-0.5 bg-gray5"></div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SignUpProcess;

