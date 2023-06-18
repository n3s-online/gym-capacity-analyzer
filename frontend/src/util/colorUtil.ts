import { Color } from "@tremor/react";

export const colorContrastArray: Color[] = ["red", "blue", "green", "purple", "pink", "indigo", "yellow", "teal", "orange"];

export const getColorForCapacityMetric = (capacity: number): string => {
    if (capacity <= 10) {
        return "emerald-500";
    }
    if (capacity <= 20) {
        return "yellow-500";
    }
    if (capacity <= 30) {
        return "orange-500";
    }
    return "rose-500";
}