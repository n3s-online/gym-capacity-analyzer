import { Card, Title, LineChart } from "@tremor/react";
import { CombinedCapacityData } from "../util/dataUtil";

interface Props {
    data: CombinedCapacityData[];
}

export default ({ data }: Props) => {
    const keys = Object.keys(data[0].keys);
    const rowsWithLabels = data.map((row) => ({
        timeDisplayString: row.timeDisplayString,
        ...row.keys
    }));
    return (
        <Card>
            <Title>Today's Capacity</Title>
            <LineChart
                className="mt-6"
                data={rowsWithLabels}
                index="timeDisplayString"
                colors={["red", "blue", "green", "purple", "pink", "indigo", "yellow", "teal", "orange"]}
                categories={keys}
                yAxisWidth={40}
            />
        </Card>
    )
};
