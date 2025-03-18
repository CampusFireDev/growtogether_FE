import { useState } from 'react';
import { FindIdAndPasswordAndJoin, FormButton, InputField } from './index';
import SnsLogin from './SnsLogin';
import { login } from '../../api/authApi';
import useAuth from '../../hooks/login/useAuth';

const LoginForm = ():JSX.Element=>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // useAuth에서 로그인 함수 가져오기
    const { login:saveToken } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        // 폼 제출 시 새로고침 방지
        e.preventDefault();

        try {
            // 로그인 API 호출
            const res = await login(email, password); 

            // 응답에 토큰이 없는 경우 예외 처리
            if (!res.accessToken) {
                console.error("로그인 응답에 accessToken 없음");
                return;
            }

            // 토큰 저장 (useAuth 훅을 통해 상태 업데이트)
            saveToken(res.accessToken);
            
            // 로그인 후 메인페이지로 이동
            window.location.href = "/";
        } catch {
            // 로그인 실패 시 알림
            alert("이메일 또는 비밀번호를 확인하세요.");
        }
    }

    return(
        <div className="w-[400px] mx-auto pt-[150px] pb-[100px]">
            <h3 className="nexon-bold text-2xl text-center">로그인</h3>
            <form className="mt-5" onSubmit={handleSubmit}>
                <InputField type="text" inputClassName="mb-2" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField type="password" inputClassName="mb-2" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <FormButton type="submit" className="bg-black4">로그인</FormButton>
                <FindIdAndPasswordAndJoin />
                <SnsLogin />
            </form>
        </div>
    )
}

export default LoginForm;