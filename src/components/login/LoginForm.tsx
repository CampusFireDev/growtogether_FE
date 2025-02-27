import { FindIdAndPassword, FormButton, InputField } from './index';
import SnsLogin from './SnsLogin';

const LoginForm = ():JSX.Element=>{
    return(
        <div className="w-[400px] mx-auto pt-[150px] pb-[100px]">
            <h3 className="nexon-bold text-2xl text-center">로그인</h3>
            <form className="mt-5">
                <InputField className="mb-2" placeholder="아이디" />
                <InputField type="password" className="mb-2" placeholder="비밀번호" />
                <FormButton type="submit">로그인</FormButton>
                <FindIdAndPassword />
                <SnsLogin />
            </form>
        </div>
    )
}

export default LoginForm;