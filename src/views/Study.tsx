import { Link } from "react-router-dom";
import BoardCardList from "../components/common/list/BoardCardList";
import FormButton from "../components/form/FormButton";

const Study = ():JSX.Element=>{
    return(
        <>
             <Link to="/study/create">
                <FormButton type="button" className="!w-[120px] !h-[40px] flex justify-center items-center text-[12px]">
                    스터디 게시글 작성
                </FormButton>
            </Link>
            <BoardCardList />
        </>
    )
}

export default Study;