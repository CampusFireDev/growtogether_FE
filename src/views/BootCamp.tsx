import { Link } from "react-router-dom";
import BoardCardList from "../components/common/list/BoardCardList";
import FormButton from "../components/form/FormButton";

const BootCamp = ():JSX.Element=>{
    return(
        <>  
            <Link to="/bootcamp/create">
                <FormButton type="button" className="!w-[120px] !h-[40px] flex justify-center items-center text-[12px]">
                    부트캠프 후기 작성
                </FormButton>
            </Link>
            <BoardCardList />
        </>
    )
}

export default BootCamp;