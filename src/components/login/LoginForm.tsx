import { useState } from 'react';
import { FindIdAndPasswordAndJoin, FormButton, InputField } from './index';
import SnsLogin from './SnsLogin';
import { login } from '../../api/authApi';

const LoginForm = ():JSX.Element=>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("로그인 성공");
        } catch {
            alert("로그인 실패");
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