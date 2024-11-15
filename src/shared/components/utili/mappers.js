import { format, subDays, subWeeks, subMonths } from "date-fns";

export const getDateRange = (filter) => {
    const now = new Date();
    switch (filter) {
        case "last24Hours":
            return {
                fromDate: format(subDays(now, 1), "yyyy-MM-dd'T'HH:mm:ss"),
                toDate: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
            };
        case "lastWeek":
            return {
                fromDate: format(subWeeks(now, 1), "yyyy-MM-dd'T'HH:mm:ss"),
                toDate: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
            };
        case "lastMonth":
            return {
                fromDate: format(subMonths(now, 1), "yyyy-MM-dd'T'HH:mm:ss"),
                toDate: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
            };
        default:
            return { fromDate: "", toDate: "" };
    }
};