import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/common/useNotification";

interface NotificationProps {
  isPopup?: boolean; // 팝업 여부를 결정하는 prop 추가
}

const Notification = ({ isPopup }: NotificationProps):JSX.Element => {
  const navigate = useNavigate();
  const { notification, notificationCount, readNotification, error } = useNotification();
  const extractRelativeUrl = (fullUrl: string) => {
    const url = new URL(fullUrl);
    // return url.pathname; // "/api/bootcamp/comments/35" 반환

    const pathname = url.pathname;
    const modifiedPath = pathname.replace("/api", "").replace("/comments", "");
    return modifiedPath; // "/bootcamp/36"
  };

  const handleNotificationClick = (notiId: number, url: string) => {
    readNotification(notiId);
    const relativeUrl = extractRelativeUrl(url);
    navigate(relativeUrl); // 해당 URL로 이동
  }; 
  
  // 팝업 알림
  if (isPopup) {
    return (
      <div className="absolute min-w-72 h-65 overflow-x-hidden overflow-y-scroll border border-gray5 
        top-full right-0 bg-white z-20 shadow-lg rounded-md p-3"
      >
        <h1 className="text-[15px] nexon-medium">🔔 알림 팝업</h1>
        {error && <p className="text-red-500">{error}</p>}
        {notification.length > 0 ? (
          <ul className="mt-2">
            {notification.map((noti, index) => {
              return (
                <li
                  key={index} className="text-[12px] text-gray-600 py-3 border-b border-gray5 last:border-none cursor-pointer hover:bg-white5"
                  onClick={() => handleNotificationClick(noti.id, noti.url || "")}
                >
                  {noti.content}
                </li>
              );
            })}
          </ul>
          ) : (
            <p className="text-[13px] text-gray-500 mt-2"> 새로운 알림이 없습니다.</p>
          )}
      </div>
    );
  };

  return(
    <>
      <strong className="block nexon-bold text-xl text-black4 mb-2">🔔 알림</strong>
      <div className="text-[10px] text-black7">
        <span className="text-[12px] text-myBlue nexon-medium">{notificationCount}</span>
        개의 읽지 않은 알람이 있습니다.
      </div>
      <div className="py-7 px-7 h-117 border border-gray5 bg-white overflow-x-hidden overflow-y-scroll">
          <h2 className="nexon-bold"></h2>
          {error && <p className="text-red-500">{error}</p>}
          {notification.length > 0 ? (
            <ul className="mt-2">
              {notification.map((noti, index) => {
              return (
                <li
                  key={index} className="text-[13px] text-gray-600 py-3 border-b border-gray5 last:border-none cursor-pointer hover:bg-white5"
                  onClick={() => handleNotificationClick(noti.id, noti.url || "")}
                >
                  <span className="nexon-medium mr-3">{index+1}</span>{noti.content}
                </li>
              );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">새로운 알림이 없습니다.</p>
          )}
      </div>
    </>
  );
};

export default Notification