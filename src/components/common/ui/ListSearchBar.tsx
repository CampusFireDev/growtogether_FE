import { useState } from "react";
import CommonSelect from "./CommonSelect";

const ListSearchBar = (): JSX.Element => {
    const [selectValue, setSelectValue] = useState<string | number>("");

    return (
        <div className="flex items-center gap-2">
            <CommonSelect
                value={selectValue}
                onChange={setSelectValue}
                options={[
                    { value: "최신순", label: "최신순" },
                    { value: "조회순", label: "조회순" },
                    { value: "마감임박순", label: "마감임박순" }
                ]}
            />
            <input type="text" className="w-[220px] h-[45px] border border-gray5 rounded-[5px] px-[8px]" placeholder="검색어를 입력해주세요." />
            <button className="w-[70px] h-[45px] bg-myBlue text-white rounded-[5px] px-[8px]">검색</button>
        </div>
    )
}
export default ListSearchBar;