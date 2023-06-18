import { Card, Flex, Text, ProgressBar, Title } from "@tremor/react";
import { DayOfWeekName } from "../util/dataUtil";
import { GymCapacityRowTransformed } from "../App";

interface GymHours {
    open: {
        hour: number;
        timeOfDayString: string;
    };
    close: {
        hour: number;
        timeOfDayString: string;
    };
}

const weekdayGymHours: GymHours = {
    open: {
        hour: 5,
        timeOfDayString: "05:00 AM",
    },
    close: {
        hour: 22,
        timeOfDayString: "10:00 PM",
    },
};

const weekendGymHours: GymHours = {
    open: {
        hour: 7,
        timeOfDayString: "07:00 AM",
    },
    close: {
        hour: 20,
        timeOfDayString: "08:00 PM",
    },
};

const gymHourInformation: Record<DayOfWeekName, GymHours> = {
    "Sunday": weekendGymHours,
    "Monday": weekdayGymHours,
    "Tuesday": weekdayGymHours,
    "Wednesday": weekdayGymHours,
    "Thursday": weekdayGymHours,
    "Friday": weekdayGymHours,
    "Saturday": weekendGymHours,
};

export default ({ dayOfWeekName, mostRecentRow }: { dayOfWeekName: DayOfWeekName; mostRecentRow: GymCapacityRowTransformed; }) => {
    const openHour = gymHourInformation[dayOfWeekName].open.hour;
    const closeHour = gymHourInformation[dayOfWeekName].close.hour;
    const currentHour = mostRecentRow.parsedDateInfo.hour + mostRecentRow.parsedDateInfo.minute / 60;
    const progress = (currentHour - openHour) / (closeHour - openHour) * 100;
    return (
        <Card>
            <Flex>
                <Title>{dayOfWeekName} Gym Hours</Title>
            </Flex>
            <Flex>
                <Text>{gymHourInformation[dayOfWeekName].open.timeOfDayString}</Text>
                <Text>{gymHourInformation[dayOfWeekName].close.timeOfDayString}</Text>
            </Flex>
            <ProgressBar value={progress} color="teal" className="mt-3" />
        </Card>
    )
};
