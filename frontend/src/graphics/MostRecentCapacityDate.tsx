import { Card, Text, Metric } from "@tremor/react";
import { GymCapacityRow } from "../App";
import { getFullDateString } from "../util/dateUtil";

interface Props {
    row: GymCapacityRow;
}

export default ({ row }: Props) => {

    return (
        <Card>
            <Text>Most Recent</Text>
            <Metric>{getFullDateString(row.date)}</Metric>
        </Card>
    )
};