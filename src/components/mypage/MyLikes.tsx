import useMyLikes from "../../hooks/mypage/useMyLikes";
const MyLikes = ():JSX.Element => {
    const { myLikes } = useMyLikes();
    return (
        <>
            <strong className="block nexon-bold text-xl text-black4 mb-2">좋아요한 게시글</strong>
            <div className="py-7 px-7 h-122 border border-gray5 bg-white overflow-x-hidden overflow-y-scroll">
                {myLikes.reviews.length > 0 ? (
                    <ul>
                        {myLikes.reviews.map((post, index) => (
                            <li key={index} className="border-b py-2">
                                <p className="text-black4">{post.title}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">좋아요한 게시글이 없습니다.</p>
                )}
            </div>
        </>
    )
}
export default MyLikes;