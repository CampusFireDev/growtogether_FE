
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/login/useAuth";
import useMyPageInfo from "../../hooks/mypage/useMyPageInfo";
import ChatPopup from "../../components/chat/ChatPopup";

const StudyChatPage = () => {
  const { studyId } = useParams();
  const { token } = useAuth();
  const { info } = useMyPageInfo();

  if (!token || !info?.nickName || !studyId) return <div>Loading...</div>;

  return (
    <ChatPopup
      studyId={Number(studyId)}
      token={token}
      myNickname={info.nickName}
    />
  );
};

export default StudyChatPage;
