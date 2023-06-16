import { CategoryBar, Card, Flex, Text } from "@tremor/react";
import { GymCapacityRow } from "../App";

interface Props {
    row: GymCapacityRow;
}

export default ({ row }: Props) => (
    <Card>
        <Flex>
            <Text>Current Capacity</Text>
            <Text>{row.capacity}%</Text>
        </Flex>
        <CategoryBar
            values={[10, 10, 10, 10, 60]}
            colors={["emerald", "yellow", "orange", "rose"]}
            markerValue={row.capacity}
            className="mt-3"
        />
    </Card>
);