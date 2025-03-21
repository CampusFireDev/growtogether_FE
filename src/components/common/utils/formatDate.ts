// 2025-03-21T02:59:11.132562
export const formatDate = (dateString: string) => {
    const [date, time] = dateString.split('T');
    const [hours, minutes, seconds] = time.split(':');
    const [sec] = seconds.split('.'); // 밀리초 제거
  
    return `${date} ${hours}:${minutes}:${sec}`;
  };
  