/**
 * 부트캠프 코스 뱃지 컴포넌트
 */

interface BootcampCourseBadgeProps {
    type: "프론트엔드" | "백엔드";
}

const typeMapping: Record<string, BootcampCourseBadgeProps["type"]> = {
    "backend": "백엔드",
    "frontend": "프론트엔드",
}

const BootcampCourseBadge = ({ type }: { type: string }) => {
    const mappedType = typeMapping[type];

    const typeStyles: Record<BootcampCourseBadgeProps["type"], string> = {
        "백엔드": "border-myBlue text-myBlue",
        "프론트엔드": "border-myGreen text-myGreen"
    };

    return (
        <span className={`inline-block h-[30px] px-[10px] text-sm/[30px] nexon-medium border rounded-full ${typeStyles[mappedType]}`}>
            { mappedType }
        </span>
    )
}

export default BootcampCourseBadge;