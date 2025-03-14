import InputField  from "../../form/InputField";
import FormButton from "../../form/FormButton";

interface UserAuthProps {
    btnTitle?: string;
    showBtn?: boolean; //  FormButton으로 표시 여부
}

const UserAuth = ({ btnTitle="", showBtn=true }: UserAuthProps):JSX.Element =>{
    return (
        <div>
            <div className="flex flex-col ">
                <label htmlFor="email" className="text-left nexon-medium text-sm mb-2">이메일</label>
                <div className="flex space-x-2">
                    <InputField type="email" id="email" placeholder="이메일을 입력해주세요" className="flex-1 text-[13px]"></InputField>
                    <button className="bg-black6 text-white text-xs px-5 rounded-[5px] nexon-medium h-[50px] whitespace-nowrap">인증번호 전송</button>
                </div>
            </div>
            <div className="">
                <InputField label="인증번호" labelFor="OTP" labelClassName="nexon-medium text-sm" type="text" id="OTP" placeholder="인증번호를 입력해주세요" className="w-full  text-[13px]"></InputField>
            </div>
            {showBtn && btnTitle && ( 
                <FormButton type="button">{btnTitle}</FormButton>
            )}
        </div>
    )
}

export default UserAuth;