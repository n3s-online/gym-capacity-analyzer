import { Card, Title, LineChart } from "@tremor/react";
import { AggregatedGymCapacityRow, AggregatedGymCapacityRowWithDay, GymCapacityRow } from "../App";

interface Props {
    rows: AggregatedGymCapacityRowWithDay[];
}

export default ({ rows }: Props) => {
    const rowsWithLabels = rows.map((row) => ({
        ...row,
        "Todays Capacity": row.dayCapacity,
        "Average Capacity": row.capacity,
    }));
    return (
        <Card>
            <Title>Today's Capacity</Title>
            <LineChart
                className="mt-6"
                data={rowsWithLabels}
                index="dateString"
                categories={["Average Capacity", "Todays Capacity"]}
                colors={["emerald", "blue"]}
                yAxisWidth={40}
            />
        </Card>
    )
};
