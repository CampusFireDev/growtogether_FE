/**
 * 포스트 상세 항목 컴포넌트
 */

interface PostInfoProps{
    label: string;
    value?: string | JSX.Element;
    labelClassName?: string; 
    valueClassName?: string; 
}

const PostInfo = ({ label, value, labelClassName, valueClassName }:PostInfoProps):JSX.Element => {
    return(
        <>
            <div className={`nexon-bold text-black4 ${labelClassName}`}>{label}</div>
            <div className={`nexon-medium text-black6 ${valueClassName}`}>{value}</div>
        </>
    )
}

export default PostInfo;