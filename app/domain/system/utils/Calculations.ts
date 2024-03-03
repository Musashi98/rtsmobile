import { SelfieParams } from "../types/SelfieParams";

export const calculateSelfieColumnCountAndWidth = (
    minimumSelfieWidth: number,
    windowWidth: number,
    minimumGapBetweenSelfies: number
): SelfieParams => {
    const temporalColumnCount = Math.floor(windowWidth / minimumSelfieWidth);

    const totalSpaceBetween = windowWidth % minimumSelfieWidth;

    let columnCount = Math.max(totalSpaceBetween < minimumGapBetweenSelfies * (temporalColumnCount - 1) ? temporalColumnCount - 1 : temporalColumnCount, 2)

    let cardWidth = Math.floor((windowWidth - minimumGapBetweenSelfies * (columnCount - 1)) / columnCount);

    return {
        columnCount,
        cardWidth
    }
}