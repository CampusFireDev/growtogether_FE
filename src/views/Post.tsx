import { FaStar, FaRegStar } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdHeart,IoMdHeartEmpty } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import FormButton from "../components/form/FormButton";
import InputField  from "../components/form/InputField";



const Post = ():JSX.Element =>{
    return(
        <div className="w-full w-max-[1200px]">  
            <div className="text-[10px] w-fit px-3 py-1 rounded-full text-center bg-myPurple text-white nexon-medium">부트캠프</div>
            <h2 className="nexon-bold text-[20px]">제로베이스</h2>
            <div className="border-y border-gray5 flex items-center justify-between">
                
                <div className="flex items-center gap-2 text-black4 text-[13px] text-nowrap py-3">
                    <img src="/images/profile.png" alt="" className="w-6 h-6"/>
                    <span className="nexon-medium">닉네임 | 작성일</span>
                    <span>2025.02.03</span>
                </div>
                <div className="flex text-black6 items-center gap-1 ">
                    <IoEyeOutline className="w-4 h-4" />
                    <p className="text-[11px]">253</p>
                </div>

            </div>

            <div className="text-[14px] sm:text-[17px] text-nowrap grid grid-cols-2 gap-x-15 border-b border-gray5 py-5">
                {/* 왼쪽 열 */}
                <div className="flex flex-col gap-4 w-full sm:w-auto">
                    <div className="grid grid-cols-2">
                        <span className="nexon-bold text-black4">참여 기간</span>
                        <span className="nexon-medium text-black6 -ml-[30px]">2024.11.01 ~ 2025.02.01</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="nexon-bold text-black4">프로그램 과정</span>
                        <span className="nexon-medium text-black6 -ml-[30px]">프론트엔드</span>
                    </div>
                    <div  className="grid grid-cols-2 ">
                        <p className="nexon-bold text-black4">학습 언어</p>
                        <div className="flex w-fit border rounded-full border-[#61DAFB] items-center justify-center gap-1 px-2 py-1 -ml-[30px]">
                            <img src="/images/react.png" alt="React" className="w-4 h-4"/>
                            <p className="text-[12px] text-[#61DAFB] ">React</p>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 열 */}
                <div className="flex flex-col gap-4 ">
                    <div className="grid grid-cols-2">
                        <p className="nexon-bold text-black4">강의 만족도</p>
                        <div className="flex text-myYellow -ml-[20px]">
                            <FaStar /><FaStar /><FaStar /><FaStar />
                            <FaRegStar />
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="nexon-bold text-black4">취업 지원 만족도</p>
                        <div className="flex text-myYellow -ml-[20px]">
                            <FaStar /><FaStar /><FaStar /><FaStar />
                            <FaRegStar />
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="nexon-bold text-black4">학습 난이도</p>
                        <div className="flex text-myYellow -ml-[20px]">
                            <FaStar /><FaStar /><FaStar /><FaStar />
                            <FaRegStar />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray5 py-5">
                <p className="nexon-bold text-black4 text-[14px] sm:text-[17px] mb-3">후기</p>

                <p className="nexon-bold text-[14px] sm:text-[17px] ">프론트엔드 초단기 취업 스쿨</p>
                <p className="text-[13px] sm:text-[15px] my-2">국비지원 교육을 듣고 시간과 돈을 허비했다는 생각이 들어 제로베이스를 찾아오게 되었습니다.
                8개월간 국비지원 프론트엔드 개발자 과정 교육을 이수하면서...</p>
            </div>

            <div className="flex justify-center items-center gap-3 my-5">
                <FormButton type="button" className="!w-[80px] !h-[50px] !flex !items-center !justify-center border border-gray5 !bg-white !text-black6 text-[16px]">
                    <div className="flex items-center justify-center gap-1">
                        <IoMdHeartEmpty className="text-black6" />
                        <span>60</span>
                    </div>
                </FormButton>
                <FormButton type="button" className="!w-[80px] !h-[50px] !flex !items-center !justify-center">목록</FormButton>
            </div>


            {/*댓굴*/}
            <div className="mb-5">
                <div className="text-[15px] nexon-bold">
                    <span className="">댓글</span>
                    <span className="text-myBlue">2</span>
                </div>
                <div className="flex gap-1">

                    <InputField type="text" placeholder="댓글을 입력하세요." className="flex-1 text-[13px] !h-[100px] "></InputField>
                    <FormButton type="submit" className="!w-[80px] !flex !items-center !justify-center">등록</FormButton>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/images/profile.png" alt="" className="w-8 h-8 z-10"/>
                        <span className="text-[13px] nexon-bold mr-5">고먐미</span>
                        <span className="text-[13px] nexon-medium text-black6">2025.02.20</span>
                    </div>
                    <div  className="flex justify-center items-center text-black4 text-[13px] gap-3">
                        <div className="flex justify-center items-center gap-1">
                            <FaRegCommentDots /> 
                            <p>답변</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <FiEdit />
                            <p>수정</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <IoTrashOutline />
                            <p>삭제</p>
                        </div>
                       
                    </div>
                </div>
                <p className="text-[12px] nexon-medium ml-[40px]">혹시 이 부트캠프 졸업 후 다른 사람들이 어떤 회사에 취업했는지 알 수 있을까요?</p>
            </div>

            {/*대댓굴*/}
            <div className="flex flex-col gap-3 mt-5 pl-10 relative">
                <div className="absolute left-[15px] top-[-60px] w-[35px] h-[80px] border-l-2 border-b-2  border-gray5 rounded-[10px] z-1"></div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/images/profile.png" alt="" className="w-8 h-8 z-10"/>
                        <span className="text-[13px] nexon-bold mr-5">Whatever</span>
                        <span className="text-[13px] nexon-medium text-black6">2025.02.21</span>
                    </div>
                    <div  className="flex justify-center items-center text-black4 text-[13px] gap-3">
                        <div className="flex justify-center items-center gap-1">
                            <FaRegCommentDots /> 
                            <p>답변</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <FiEdit />
                            <p>수정</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <IoTrashOutline />
                            <p>삭제</p>
                        </div>
                       
                    </div>
                </div>
                <p className="text-[12px] nexon-medium w-[450px] ml-[40px]">많은 사람들이 스타트업, 중소기업, 그리고 대기업 IT 부서 등에서 개발자로 취업하고 있어요. 
                    구체적으로는 카카오, 네이버, 삼성, LG, 그리고 스타트업 등에서 일하고 있는 졸업생들이 많습니다. 
                    또한, 프리랜서로 활동하거나 자기 프로젝트를 통해 창업한 사람들도 있습니다.
                </p>
            </div>
        
        </div>
    )
}

export default Post;