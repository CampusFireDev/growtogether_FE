import FormButton from "../form/FormButton";
import InputField from "../form/InputField";

const FindPassword = ():JSX.Element =>{
    return(
        <div className="text-center w-[400px]">
            <h1 className="text-2xl nexon-bold py-12">비밀번호 찾기</h1>
            <p className="text-sm mb-10 text-black8"> 회원정보에 등록된 이메일을 입력해주세요 <br/>
                비밀번호 재설정 링크가 포함된 메일이 계정의 이메일 주소로 발송됩니다.
            </p>
            <InputField type="email" id="email" name="email" placeholder="이메일을 입력해주세요." className="text-[13px] mb-6"></InputField>
            <FormButton type="button">비밀번호 재설정 이메일 받기</FormButton>
        </div>
    )
}

export default FindPassword;