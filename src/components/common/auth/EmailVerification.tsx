// import { useState } from "react";
// import { useEmailVerification } from "../../../hooks/auth/useEmailVerification";
// import { InputField } from "../../login";

// const EmailVerification = () => {
//     const [code, setCode] = useState("");

//     const { sendEmailVerification, verifyEmailCode, isSending, hasSentCode, errorMessage } = useEmailVerification();

//     return (
//         <div>
//             <label htmlFor="email" className="block mb-2 nexon-medium text-[15px] text-black4">이메일</label>
//             <div className="flex gap-2">
//                 <InputField
//                     type="email"
//                     id="email"
//                     value={email}
//                     name="email"
//                     className="w-full"
//                     placeholder="이메일을 입력해주세요."
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button
//                     onClick={() => sendEmailVerification(email)}
//                     className={`
//                         text-white text-sm px-5 rounded-[5px] nexon-medium h-[50px] whitespace-nowrap flex-shrink cursor-pointer
//                         ${ hasSentCode ? "bg-black6" : "bg-myBlue" }
//                     `}
//                     disabled={ isSending || isVerified }
//                 >
//                     { isSending ? "전송 중..." : hasSentCode ? "인증번호 재전송" : "인증번호 보내기" }
//                 </button>
//             </div>

//             {hasSentCode && (
//                 <div className="mt-5">
//                     <label htmlFor="code" className="block mb-2 nexon-medium text-[15px] text-black4">인증번호</label>
//                     <div className="flex gap-2">
//                         <InputField
//                             type="text"
//                             id="code"
//                             name="code"
//                             value={code}
//                             placeholder="인증번호를 입력해주세요."
//                             className="w-full"
//                             onChange={(e) => setCode(e.target.value)}
//                         />
//                         {!isVerified && (
//                             <button
//                                 onClick={() => verifyEmailCode(email, code)}
//                                 className="bg-myBlue text-white text-sm px-5 rounded-[5px] nexon-medium h-[50px] whitespace-nowrap flex-shrink cursor-pointer"
//                             >
//                                 인증번호 확인
//                             </button>
//                         )}
//                     </div>
//                     { isVerified && <p className="mt-1 text-sm text-myBlue">이메일 인증이 완료되었습니다.</p> }
//                     { errorMessage && <p className="mt-1 text-sm text-myRed">{ errorMessage }</p> }
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EmailVerification;
