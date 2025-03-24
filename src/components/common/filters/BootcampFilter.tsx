import { Link } from "react-router-dom";
import DropdownFilter from "./DropdownFilter";

interface BootcampFilterProps {
    onReset: () => void;
};

const BootcampFilter = ({ onReset }:BootcampFilterProps ): JSX.Element => {
    return (
        <div className="fixed flex justify-between items-center full-line max-w-[1200px] w-full py-[15px] bg-white">
            <div className="flex gap-2">
                {/* <button className="h-[40px] px-[15px] text-[11px] sm:text-[15px] text-black4 border border-gray5 rounded-[50px]">
                    <span className="inline-block mr-1 text-[10px] sm:text-[13px]">❤️</span> 내가 찜한 부트캠프
                </button> */}
                <DropdownFilter label="학습 언어" />
                <DropdownFilter label="프로그램 과정" />
            </div>
            <div className="flex gap-2">
                <Link to="/bootcamp/create">
                    <button className="h-[40px] px-[15px] text-[11px] sm:text-[15px] text-white bg-black4 rounded-[5px] cursor-pointer">
                        부트캠프 후기 작성하기
                    </button>
                </Link>
                <button className="flex items-center justify-center w-[40px] h-[40px] rounded-[5px] bg-myBlue cursor-pointer" onClick={onReset}>
                    <svg fill="currentColor" height="24" viewBox="-1.5 -2.5 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="m4.859 5.308 1.594-.488a1 1 0 0 1 .585 1.913l-3.825 1.17a1 1 0 0 1-1.249-.665L.794 3.413a1 1 0 1 1 1.913-.585l.44 1.441C5.555.56 10.332-1.035 14.573.703a9.381 9.381 0 0 1 5.38 5.831 1 1 0 1 1-1.905.608A7.381 7.381 0 0 0 4.86 5.308zm12.327 8.195-1.775.443a1 1 0 1 1-.484-1.94l3.643-.909a.997.997 0 0 1 .61-.08 1 1 0 0 1 .84.75l.968 3.88a1 1 0 0 1-1.94.484l-.33-1.322a9.381 9.381 0 0 1-16.384-1.796l-.26-.634a1 1 0 1 1 1.851-.758l.26.633a7.381 7.381 0 0 0 13.001 1.25z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
};

export default BootcampFilter;