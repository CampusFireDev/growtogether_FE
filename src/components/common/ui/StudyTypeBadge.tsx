/**
 * 스터디 타입(프로젝트, 스터디) 컴포넌트
 */

interface StudyTypeBadgeProps {
    type: "프로젝트" | "스터디" | "부트캠프";
}

const typeMapping: Record<string, StudyTypeBadgeProps["type"]> = {
    "PROJECT": "프로젝트",
    "STUDY": "스터디",
    "BOOTCAMP": "부트캠프",
}

const StudyTypeBadge = ({ type }: { type: string }) => {
    const mappedType = typeMapping[type];

    const typeStyles: Record<StudyTypeBadgeProps["type"], string> = {
        "스터디": "bg-myBlue",
        "프로젝트": "bg-myYellow",
        "부트캠프" : "bg-myPurple",
    };

    return (
        <span className={`inline-block h-[30px] px-[10px] text-sm/[30px] nexon-medium text-white rounded-full ${typeStyles[mappedType]}`}>
            { mappedType }
        </span>
    )
}

export default StudyTypeBadge;