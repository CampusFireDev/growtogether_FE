import StudyCardList from "../components/study/StudyCardList";
import StudyPopularCardList from "../components/study/StudyPopularCardList";
import ListSearchBar from "../components/common/ui/ListSearchBar";
import StudyFilter from "../components/common/filters/StudyFilter";

const Study = ():JSX.Element=>{
    return(
        <>
            <StudyFilter />
            <div className="pt-[110px] pb-[70px]">
                <div className="mb-[20px]">
                    <h3 className="nexon-bold text-[24px] text-black4">🔥 현재 급상승 중인 모집글</h3>
                </div>
                <StudyPopularCardList />
                <div className="flex justify-between items-center mb-[20px] mt-[60px]">
                    <h3 className="nexon-bold text-[24px] text-black4">모집 중인 스터디 <span className="text-myBlue">5</span>개를 찾았어요.</h3>
                    <ListSearchBar />
                </div>
                <StudyCardList />
            </div>
        </>
    )
}

export default Study;