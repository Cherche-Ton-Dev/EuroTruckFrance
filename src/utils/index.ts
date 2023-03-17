export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export function getDaysBetweenDates(date1: number, date2: number) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffMilliseconds = Math.abs(date1 - date2);
    const diffDays = Math.round(diffMilliseconds / oneDay);
    return diffDays;
}