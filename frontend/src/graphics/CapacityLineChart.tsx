import { Card, Title, LineChart } from "@tremor/react";
import { GymCapacityRowTransformedWithAverage } from "../App";

interface Props {
    rows: GymCapacityRowTransformedWithAverage[];
}

export default ({ rows }: Props) => {
    const rowsWithLabels = rows.map((row) => ({
        ...row,
        "Todays Capacity": row.rowCapacity,
        "Average Capacity": row.averageCapacity,
    }));
    return (
        <Card>
            <Title>Today's Capacity</Title>
            <LineChart
                className="mt-6"
                data={rowsWithLabels}
                index="timeDisplayString"
                categories={["Average Capacity", "Todays Capacity"]}
                colors={["emerald", "blue"]}
                yAxisWidth={40}
            />
        </Card>
    )
};
