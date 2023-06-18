import { Card, Text, Metric, Flex } from "@tremor/react";
import { GymCapacityRow } from "../App";
import { getFullDateString } from "../util/dateUtil";
import { getColorForCapacityMetric } from "../util/colorUtil";

interface Props {
    row: GymCapacityRow;
}

export default ({ row }: Props) => {

    return (
        <Card>
            <Flex justifyContent="around">
                <div>
                    <Text>Last Updated</Text>
                    <Metric>{getFullDateString(row.date)}</Metric>
                </div>
                <div>
                    <Text>Current Capacity</Text>
                    <Metric className={`text-${getColorForCapacityMetric(row.capacity)}`}>{row.capacity}%</Metric>
                </div>
            </Flex>
        </Card>
    )
};