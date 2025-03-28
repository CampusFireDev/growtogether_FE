import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMemberPw from "../../hooks/auth/useMemberPw";
import FormButton from "../form/FormButton";
import InputField from "../form/InputField";
import ValidatePassword from "./ValidatePassword";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ResetPassword = (): JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error] = useState<{ [key: string]: string }>({});
    const { resetPassword } = useMemberPw();
    const [token, setToken] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // URL에서 token 파싱
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            alert("유효하지 않은 요청입니다.");
            navigate("/"); // 잘못된 요청 시 홈으로 리디렉션
        }
    }, [location, navigate]);

    const handleShow = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async () => {
        if (!token) {
            alert("유효한 토큰이 없습니다.");
            return;
        }
        try {
            await resetPassword(token, password);
            alert("비밀번호가 성공적으로 변경되었습니다.");
            navigate("/login"); // 로그인 페이지로 리디렉션
        } catch (error) {
            alert("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div className="text-center w-[400px] mx-auto">
            <h1 className="text-2xl nexon-bold py-12">비밀번호 재설정</h1>
            <p className="text-sm mb-10 text-black8">변경하실 비밀번호를 입력해주세요.</p>
            <div className="relative mb-10">
                <InputField
                    label="새 비밀번호"
                    labelFor="newPassword"
                    labelClassName="nexon-medium text-sm"
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="password"
                    placeholder="영문+숫자+특수문자 조합으로 최소 8자 입력해주세요."
                    className="text-[13px] text-left relative"
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={error.password}
                >
                    <span className="w-5 h-5 cursor-pointer text-black4" onClick={handleShow}>
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </span>
                </InputField>
                <ValidatePassword password={password} onValidationChange={() => password} />
            </div>
            <div className="relative mb-10">
                <InputField
                    label="새 비밀번호 확인"
                    labelFor="confirmPassword"
                    labelClassName="nexon-medium text-sm"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="password"
                    placeholder="비밀번호를 다시 입력해주세요."
                    className="text-[13px] text-left relative"
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={error.password}
                >
                    <span className="w-5 h-5 cursor-pointer text-black4" onClick={handleShow}>
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </span>
                </InputField>
            </div>
            <FormButton type="button" onClick={handleSubmit}>
                비밀번호 변경
            </FormButton>
        </div>
    );
};

export default ResetPassword;
