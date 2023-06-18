import React from 'react'
import { Grid, Col, Card, Text, Metric } from "@tremor/react";
import CapacityBar from './graphics/CapacityBar';
import CurrentCapacity from './graphics/CurrentCapacity';
import * as z from "zod";

import data from "./assets/data.json";
import { RowFilter, addFields, averageCapacity, combineCapacityData, getMostRecentGymCapacity, getSortedTimeDisplayStringsThatExistInData } from './util/dataUtil';
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

const allTimeAverage = averageCapacity(parsedData);
export const allTimeSortedKeys = getSortedTimeDisplayStringsThatExistInData(allTimeAverage);

const mostRecentRow = getMostRecentGymCapacity(parsedData);
const mostRecentRowDateFilter: RowFilter = (row) => row.date.getDate() === mostRecentRow.date.getDate() && row.date.getMonth() === mostRecentRow.date.getMonth() && row.date.getFullYear() === mostRecentRow.date.getFullYear();
const mostRecentDayCapacity = averageCapacity(parsedData, mostRecentRowDateFilter);

const mostRecentRowDayOfWeek = mostRecentRow.date.getDay();
const mostRecentRowDayOfWeekName = mostRecentRow.parsedDateInfo.dayOfWeekName;
const mostRecentRowDayOfWeekFilter: RowFilter = (row) => row.date.getDay() === mostRecentRowDayOfWeek;
const allTimeAverageDayOfWeek = averageCapacity(parsedData, mostRecentRowDayOfWeekFilter);

const lineGraphData = combineCapacityData({ data: mostRecentDayCapacity, key: "Today" }, { data: allTimeAverage, key: "Average" }, { data: allTimeAverageDayOfWeek, key: `Average ${mostRecentRowDayOfWeekName}` });

// Visuals to do:
// - Add day of week average to bar chart
// - Add average capacity for current time on current day to current capacity slider and card
// - Add delta from current capacity to recent capacity (maybe average the last 3 entries)
// - Add DeltaBar for current capacity delta from average capacity for current time on current day
// - maybe add max/min/p90 to line chart

function App() {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2 p-5">
      <MostRecentCapacityDate row={mostRecentRow} />
      <CurrentCapacity row={mostRecentRow} />
      <CapacityBar row={mostRecentRow} />
      <Col numColSpanSm={1} numColSpanMd={2} numColSpanLg={3} >
        <CapacityLineChart data={lineGraphData} />
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