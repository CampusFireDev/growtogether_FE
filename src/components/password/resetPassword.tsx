import FormButton from "../form/FormButton";
import InputField from "../form/InputField";

const resetPassword = ():JSX.Element => {
    return(
        <div className="text-center w-[400px]">
            <h1 className="text-2xl nexon-bold py-12">비밀번호 재설정</h1>
            <p className="text-sm mb-10 text-black8"> 변경하실 비밀번호를 입력해주세요.</p>
            <InputField label="새 비밀번호" labelFor="newPassword" labelClassName="nexon-medium text-sm" type="password"  id="newPassword" name="password" placeholder="영문+숫자+특수문자 조합으로 최소 8자 입력해주세요." className="text-[13px] mb-6 text-left"></InputField>
            <InputField label="새 비밀번호 확인" labelFor="confirmPassword" labelClassName="nexon-medium text-sm" type="password" id="confirmPassword" name="password" placeholder="비밀번호를 다시 입력해주세요." className="text-[13px] mb-6 text-left"></InputField>
            <FormButton type="button">비밀번호 변경</FormButton>
        </div>
    )
}

export default resetPassword;