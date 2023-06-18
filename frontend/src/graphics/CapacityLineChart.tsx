import { Card, Title, LineChart } from "@tremor/react";
import { CombinedCapacityData } from "../util/dataUtil";
import { colorContrastArray } from "../util/colorUtil";

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
            <Title>Daily Capacity</Title>
            <LineChart
                className="mt-6"
                data={rowsWithLabels}
                index="timeDisplayString"
                colors={colorContrastArray}
                categories={keys}
                yAxisWidth={40}
            />
        </Card>
    )
};
