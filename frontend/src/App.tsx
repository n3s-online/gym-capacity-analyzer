import React from 'react'
import { Grid, Col, Card, Text, Metric } from "@tremor/react";
import CapacityBar from './graphics/CapacityBar';
import CurrentCapacity from './graphics/CurrentCapacity';


function App() {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2 p-5">
      <Col numColSpan={1} numColSpanLg={2}>
        <CurrentCapacity />
      </Col>
      <Card>
        <CapacityBar />
      </Card>
      <Col>
        <Card>
          <Text>Title</Text>
          <Metric>KPI 3</Metric>
        </Card>
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