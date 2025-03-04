/**
 * 포스트 상세 항목 컴포넌트
 */

interface PostInfoProps{
    label: string;
    value?: string | JSX.Element;
    labelWidth?: string; // 화면 크기에 맞게 라벨의 너비를 조정
    labelMaxWidth?: string;
    className?: string; 
}

const PostInfo = ({ label, value, labelWidth, labelMaxWidth, className }:PostInfoProps):JSX.Element => {
    return(
        <div className="flex flex-col gap-4">
            <div className={`grid grid-cols-[${labelWidth}_1fr] lg:grid-cols-[${labelMaxWidth}_1fr]`}>
                <div className={`nexon-bold text-black4 ${className}`}>{label}</div>
                <div className={`nexon-medium text-black6 ${className}`}>{value}</div>
            </div>
        </div>
    )
}

export default PostInfo;