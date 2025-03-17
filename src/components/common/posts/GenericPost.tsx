import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../ui/Loading";
import Post from "../../../views/Post";
import { BootcampData } from "../../../types/bootcamp";
import { StudyData } from "../../../types/study";

interface GenericPostProps<T> {
    postType: "bootcamp" | "study";
    post: T;
    renderContent: (post: T) => JSX.Element;
}


const GenericPost = <T extends BootcampData | StudyData>({ postType, post, renderContent }:GenericPostProps<T>):JSX.Element =>{
    // const { id } = useParams<{id?: string}>();
    // const [post, setPost ] = useState<T | null>(null);

    // useEffect(() => {
    //     console.log(`Fetching data from /${postType}`);

    //     fetch(`/${postType}/${id}`, {
    //         cache: "no-store",
    //         headers: {
    //             Accept: "application/json",
    //         },
    //     })
    //     .then((res) =>{
    //         console.log("응답 상태: ", res.status);
    //         console.log("응답 Content-Type", res.headers.get("Content-Type"));
    //         if (!res.ok) {
    //             throw new Error(`HTTP error! Status: ${res.status}`);
    //         }
    //         return res.json();
    //     })
    //     .then((data) =>{
    //         console.log("받은 데이터", data);
    //         setPost(data);
    //     })
    //     .catch((error) => {
    //         console.error("API 호출 실패: ", error);
    //         if (error instanceof TypeError && error.message.includes("JSON")) {
    //           console.error("응답이 JSON이 아닙니다. HTML 응답일 가능성이 높습니다.");
    //         }
    //     });
    // }, [id, postType]);

    // if (!post) return <Loading />;

    return(
       <Post post={post} postType={postType} postTitle={(post as any).title} infoTitle={postType==="bootcamp"? "후기" : "모집 내용"}>
            {renderContent(post)}
       </Post>
    );
};

export default GenericPost;