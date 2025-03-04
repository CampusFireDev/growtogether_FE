/**
 * 로딩 화면 컴포넌트
 */
const Loading = ():JSX.Element =>{
    return(
        <div className="flex justify-center items-center h-screen">
            <img src="/images/loading.gif" alt="로딩 중" />
        </div>
    )
}

export default Loading;