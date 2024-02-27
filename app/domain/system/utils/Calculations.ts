import { SelfieParams } from "../types/SelfieParams";

export const calculateSelfieColumnCountAndWidth = (
    minimumSelfieWidth: number,
    windowWidth: number,
    minimumGapBetweenSelfies: number
): SelfieParams => {
    const temporalColumnCount = Math.floor(windowWidth / minimumSelfieWidth);

    const totalSpaceBetween = windowWidth % minimumSelfieWidth;

    const columnCount = totalSpaceBetween < minimumGapBetweenSelfies * (temporalColumnCount - 1) ? temporalColumnCount - 1 : temporalColumnCount;

    const cardWidth = Math.floor(windowWidth / columnCount - minimumGapBetweenSelfies * (columnCount - 1));

    return {
        columnCount,
        cardWidth
    }
}