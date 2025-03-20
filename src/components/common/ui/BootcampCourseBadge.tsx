/**
 * 부트캠프 코스 뱃지 컴포넌트
 */

interface BootcampCourseBadgeProps {
    type: "데브옵스" | "데이터베이스" | "백엔드" | "프론트엔드" | "클라우드";
}

const typeMapping: Record<string, BootcampCourseBadgeProps["type"]> = {
    "DEVOPS": "데브옵스",
    "DATABASE": "데이터베이스",
    "BACKEND": "백엔드",
    "FRONTEND": "프론트엔드",
    "CLOUD" : "클라우드",
}

const BootcampCourseBadge = ({ type }: { type: string }) => {
    const mappedType = typeMapping[type];

    const typeStyles: Record<BootcampCourseBadgeProps["type"], string> = {
        "데브옵스": "border-myYellow text-myYellow",
        "데이터베이스": "border-myPurple text-myPurple",
        "백엔드": "border-myBlue text-myBlue",
        "프론트엔드": "border-myGreen text-myGreen",
        "클라우드": "border-myBlue text-myBlue",
    };

    return (
        <span className={`inline-block h-[30px] px-[10px] text-sm/[30px] nexon-medium border rounded-full ${typeStyles[mappedType]}`}>
            { mappedType }
        </span>
    )
}

export default BootcampCourseBadge;