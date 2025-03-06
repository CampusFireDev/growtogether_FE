import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";
import StudyTypeBadge from "../ui/StudyTypeBadge";
import TechStackList from "../ui/TechStackList";
import Loading from "../ui/Loading"; 

interface StudyData {
    id: number;
    type: string;
    title: string;
    description: string;
    maxSize: number;
    startDate: string;
    endDate: string;
    techStack: string[];
    viewCount: number;
    studyStatus: string;
}

const BoardCardList = ():JSX.Element => {
    const [study, setStudy] = useState<StudyData | null>(null);

    useEffect(() => {
        // 약간의 지연 후 요청 (MSW 초기화 시간 확보)
        const timer = setTimeout(() => {
            console.log("Fetching data from /study");

            fetch("/study", {
                cache: "no-store",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then((res) => {
                console.log("응답 상태: ", res.status);
                console.log("응답 Content-Type", res.headers.get("Content-Type"))

                if(!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`)
                }

                return res.json();
            })
            .then((data) => {
                console.log("받은 데이터: ", data);
                setStudy(data[0]);
            })
            .catch((error) => {
                console.error("API 호춯 실패: ", error);
                // 오류 응답 내용 확인 (HTML인 경우)
                if (error instanceof TypeError && error.message.includes('JSON')) {
                    console.error("응답이 JSON이 아닙니다. HTML 응답일 가능성이 높습니다.");
                }
            });
        }, 500);

        return () => clearTimeout(timer);
      }, []);
      

    // study가 null이면 로딩표시
    if (!study) {
        return <Loading />
    }

    return (
        <div className="border border-gray5 py-[25px] px-[30px] rounded-[10px]">
            <Link to="/">
                <div className="flex justify-between">
                    <StudyTypeBadge type={study.type} />
                    <StatusBadge status={study.studyStatus} />
                </div>
                <div className="flex align-center text-sm gap-1 mt-[20px] text-black6">
                    <strong>마감일</strong>
                    <span className="text-xs/[21px]">|</span>
                    <p>{study.endDate}</p>
                </div>
                <strong className="block text-xl nexon-bold mt-[10px] mb-[15px] text-black4">{study.title}</strong>
                {/* 기술스택 */}
                <TechStackList stacks={study.techStack ?? []}/>
                <div>
                    <div>
                        <div></div>
                        <p>닉네임</p>
                    </div>
                    <ul>
                        <li>{study.viewCount}</li>
                        <li>42</li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}
export default BoardCardList;