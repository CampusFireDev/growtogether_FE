/**
 * 모집 상태 컴포넌트
 */

interface StatusBadgeProps {
    status: "모집중" | "진행중" | "모집마감";
}

const statusMapping: Record<string, StatusBadgeProps["status"]> = {
    "PROGRESS": "진행중",
    "COMPLETE": "모집마감",
    "RECRUIT": "모집중",
};

const StatusBadge = ({ status }: { status: string }) => {
    const mappedStatus = statusMapping[status];
  
    const statusStyles: Record<StatusBadgeProps["status"], string> = {
      "모집중": "border-green-500 text-green-500",
      "진행중": "border-blue-500 text-blue-500",
      "모집마감": "border-black9 text-black9",
    };
  
    return (
      <span className={`inline-block h-[30px] px-[10px] text-sm/[30px] nexon-medium border rounded-full bg-white ${statusStyles[mappedStatus]}`}>
        {mappedStatus}
      </span>
    );
  };
  
  export default StatusBadge;
  