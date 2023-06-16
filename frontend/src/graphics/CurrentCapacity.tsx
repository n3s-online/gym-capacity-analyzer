import { Card, Text, Metric } from "@tremor/react";
import { GymCapacityRow } from "../App";
import { getMostRecentGymCapacity } from "../util/dataUtil";

interface Props {
    row: GymCapacityRow;
}

export default ({ row }: Props) => {

    return (
        <Card>
            <Text>Current Capacity</Text>
            <Metric>{row.capacity}%</Metric>
        </Card>
    )
};