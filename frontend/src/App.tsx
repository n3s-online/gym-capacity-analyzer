import React from 'react'
import { Grid, Col, Card, Text, Metric } from "@tremor/react";
import CapacityBar from './graphics/CapacityBar';
import CurrentCapacity from './graphics/CurrentCapacity';
import * as z from "zod";

import data from "./assets/data.json";
import { addFields, averageCapacity, combineCapacityData, getMostRecentGymCapacity } from './util/dataUtil';
import MostRecentCapacityDate from './graphics/MostRecentCapacityDate';
import CapacityLineChart from './graphics/CapacityLineChart';

const dataSchema = z.array(
  z.object({
    date: z.string().transform((val) => new Date(val)),
    capacity: z.number()
  })
);

export type GymCapacityRow = z.infer<typeof dataSchema>[number];

export type GymCapacityRowTransformed = ReturnType<typeof addFields>[number];
export type GymCapacityRowTransformedWithAverage = ReturnType<typeof combineCapacityData>[number];

const parsedData = addFields(dataSchema.parse(data));
const mostRecentRow = getMostRecentGymCapacity(parsedData);
const mostRecentDayRows = parsedData.filter(row => row.date.getDate() === mostRecentRow.date.getDate() && row.date.getMonth() === mostRecentRow.date.getMonth() && row.date.getFullYear() === mostRecentRow.date.getFullYear());
const allTimeAverage = averageCapacity(parsedData);
const mostRecentDayRowsWithAverage = combineCapacityData(mostRecentDayRows, allTimeAverage)

// Visuals to do:
// 1. Add day of week average to line chart
// 2. Add day of week average to bar chart
// 3. Add average capacity for current time on current day to current capacity slider and card
// 4. Add delta from current capacity to recent capacity (maybe average the last 3 entries)
// 5. Add DeltaBar for current capacity delta from average capacity for current time on current day

function App() {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2 p-5">
      <MostRecentCapacityDate row={mostRecentRow} />
      <CurrentCapacity row={mostRecentRow} />
      <CapacityBar row={mostRecentRow} />
      <Col numColSpan={3}>
        <CapacityLineChart rows={mostRecentDayRowsWithAverage} />
      </Col>
      <Card>
        <Text>Title</Text>
        <Metric>KPI 4</Metric>
      </Card>
      <Card>
        <Text>Title</Text>
        <Metric>KPI 5</Metric>
      </Card>
    </Grid>
  )
}

export default App;