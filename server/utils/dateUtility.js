import dayjs from 'dayjs';

export const calculateDays = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, 'day')+1;  //difference in days +1 to include both start and end date
}

export const isDateRangeValid = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.isAfter(start) || end.isSame(start, 'day'); //end date should be after or same as start date
}