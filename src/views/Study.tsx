import StudyCardList from "../components/common/study/StudyCardList";

const Study = ():JSX.Element=>{
    return(
        <>
            <div className="mb-[20px]">
                <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 모집글</h3>
            </div>
            <StudyCardList />
            <div className="mb-[20px]">
                <h3 className="nexon-bold text-[24px] text-black4">모집 중인 스터디 <span className="text-myBlue">5</span>개를 찾았어요.</h3>
            </div>
            <StudyCardList />
        </>
    )
}

export default Study;