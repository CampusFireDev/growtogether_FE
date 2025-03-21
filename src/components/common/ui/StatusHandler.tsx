import React from "react";

interface StatusHandlerProps {
    loading?: boolean;
    error?: string | null;
    children: React.ReactNode;
}

const StatusHandler = ({ loading, error, children }: StatusHandlerProps):JSX.Element => {
    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <img src="/images/loading.gif" alt="로딩 중..."/>
            </div>
        )
    }
    if (error) {
        return <div className="text-red-500">⚠️ 데이터 불러오기 실패: {error}</div>
    }
    return(
        <>{children}</>
    )
}; 

export default StatusHandler;