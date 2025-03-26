/**
 * 날짜 형식 포맷 가공
 * 
 * @param dateString 
 * @returns 
 */

export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(
        date.getMinutes()
    ).padStart(2, "0")}`;
};