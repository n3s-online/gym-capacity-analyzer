import { CategoryBar, Card, Flex, Text } from "@tremor/react";

export default () => (
    <>
        <Flex>
            <Text>Rating Product A</Text>
            <Text>62%</Text>
        </Flex>
        <CategoryBar
            values={[40, 30, 20, 10]}
            colors={["emerald", "yellow", "orange", "rose"]}
            markerValue={62}
            className="mt-3"
        />
    </>
);