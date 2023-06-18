import { GymCapacityRow, GymCapacityRowTransformed } from "../App";
import { getDateHhMm } from "./dateUtil";

export const getMostRecentGymCapacity = (rows: GymCapacityRow[]): GymCapacityRow => {
    return rows[rows.length - 1];
}

const sortedHourOptions = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const sortedMinuteOptions = ["00", "15", "30", "45"];
const sortedTimeIndicators = ["AM", "PM"];
const sortedTimeDisplayStrings = (() => {
    const timeDisplayStrings: string[] = [];
    sortedTimeIndicators.forEach(timeIndicator => {
        sortedHourOptions.forEach(hour => {
            sortedMinuteOptions.forEach(minute => {
                timeDisplayStrings.push(`${hour}:${minute} ${timeIndicator}`);
            });
        });
    });
    return timeDisplayStrings;
})();
const getSortedTimeDisplayStringsThatExistInData = <T extends {}>(data: T) => {
    return sortedTimeDisplayStrings.filter(timeDisplayString => timeDisplayString in data);
}

const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
export const addFields = (rows: GymCapacityRow[]) => {
    const transformedRows = rows.map(row => {
        const minutesRounded = Math.round(row.date.getMinutes() / 15) * 15;
        const timeDisplayString = getDateHhMm(row.date);
        return ({
            ...row,
            parsedDateInfo: {
                hour: row.date.getHours(),
                minute: minutesRounded,
                dayOfWeek: row.date.getDay(),
                dayOfWeekName: dayOfWeekNames[row.date.getDay()]
            },
            timeDisplayString
        });
    });
    return transformedRows;
}

export type AggregatedCapacity = { [timeDisplayString: string]: number };
type AggregatedCapacityAccumulator = { [timeDisplayString: string]: { count: number, capacity: number } };

export const averageCapacity = (rows: GymCapacityRowTransformed[], rowFilter?: (row: GymCapacityRowTransformed) => boolean): AggregatedCapacity => {
    const filteredRows: GymCapacityRowTransformed[] = !!rowFilter ? rows.filter(rowFilter) : rows;
    const aggregatedCapacity = filteredRows.reduce((acc, row) => {
        if (acc[row.timeDisplayString]) {
            acc[row.timeDisplayString].count++;
            acc[row.timeDisplayString].capacity += row.capacity;
        } else {
            acc[row.timeDisplayString] = { count: 1, capacity: row.capacity };
        }
        return acc;
    }, {} as AggregatedCapacityAccumulator);
    const averagedCapacity: AggregatedCapacity = {};
    Object.keys(aggregatedCapacity).forEach(timeDisplayString => {
        averagedCapacity[timeDisplayString] = Math.round(aggregatedCapacity[timeDisplayString].capacity / aggregatedCapacity[timeDisplayString].count * 100) / 100;
    });
    return averagedCapacity;
}

export const combineCapacityData = (rows: GymCapacityRowTransformed[], averageCapacity: AggregatedCapacity) => {
    const sortedKeys = getSortedTimeDisplayStringsThatExistInData(averageCapacity);
    const combinedCapacityData = sortedKeys.map(timeDisplayString => {
        return {
            timeDisplayString,
            averageCapacity: averageCapacity[timeDisplayString],
            rowCapacity: rows.find(row => row.timeDisplayString === timeDisplayString)?.capacity
        }
    });
    return combinedCapacityData;
}