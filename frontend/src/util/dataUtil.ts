import { AggregatedGymCapacityRow, AggregatedGymCapacityRowWithDay, GymCapacityRow, GymCapacityRowTransformed } from "../App";
import { getDateHhMm } from "./dateUtil";

export const getMostRecentGymCapacity = (rows: GymCapacityRow[]): GymCapacityRow => {
    return rows[rows.length - 1];
}

export const addFields = (rows: GymCapacityRow[]): GymCapacityRowTransformed[] => {
    const rowsWithHhMmMilitary = rows.map(row => {
        const minutesRounded = Math.round(row.date.getMinutes() / 15) * 15;
        return ({
            ...row,
            timeOfDay: `${row.date.getHours()}:${minutesRounded}`,
            dateString: getDateHhMm(row.date)
        });
    });
    return rowsWithHhMmMilitary;
}

export const aggregateCapacityByTimeOfDay = (rows: GymCapacityRowTransformed[]): AggregatedGymCapacityRow[] => {
    const rowsByTimeOfDay: { [timeOfDay: string]: GymCapacityRowTransformed[] } = {};
    rows.forEach(row => {
        if (rowsByTimeOfDay[row.timeOfDay]) {
            rowsByTimeOfDay[row.timeOfDay].push(row);
        } else {
            rowsByTimeOfDay[row.timeOfDay] = [row];
        }
    });
    const gymCapacityAverages: AggregatedGymCapacityRow[] = Object.keys(rowsByTimeOfDay).map(timeOfDay => {
        const rowsAtTimeOfDay = rowsByTimeOfDay[timeOfDay];
        const averageCapacity = rowsAtTimeOfDay.reduce((acc, row) => acc + row.capacity, 0) / rowsAtTimeOfDay.length;
        return ({
            timeOfDay,
            dateString: rowsAtTimeOfDay[0].dateString,
            capacity: averageCapacity
        });
    });
    // sort by time of day
    return gymCapacityAverages.sort((a, b) => {
        const aTime = a.timeOfDay.split(':');
        const bTime = b.timeOfDay.split(':');
        if (aTime[0] !== bTime[0]) {
            return parseInt(aTime[0]) - parseInt(bTime[0]);
        }
        return parseInt(aTime[1]) - parseInt(bTime[1]);
    });
}


export const addDaysCapacityToAggregatedRows = (aggregatedRows: AggregatedGymCapacityRow[], dailyRows: GymCapacityRowTransformed[]): AggregatedGymCapacityRowWithDay[] => {
    return aggregatedRows.map(aggregatedRow => {
        const matchingDailyRow = dailyRows.find(dailyRow => dailyRow.dateString === aggregatedRow.dateString);
        if (!matchingDailyRow) {
            return aggregatedRow;
        }
        return ({
            ...aggregatedRow,
            dayCapacity: matchingDailyRow.capacity
        });
    });
}