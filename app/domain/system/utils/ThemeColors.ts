export type ThemeType = "primary" | "secondary" | "danger" | "success" | "disabled"
export type ModeType = "light" | "dark"

export const ThemeColors = {
    light: {
        primary: "rgb(250, 147, 78)",
        secondary: "rgb(50, 50, 50)",
        danger: "rgb(229, 72, 77)",
        success: "rgb(83, 198, 83)",
        disabled: "rgb(200, 200, 200)"
    },
    dark: {
        primary: "rgb(220, 117, 48)",
        secondary: "rgb(30, 30, 30)",
        danger: "rgb(250, 150, 160)",
        success: "rgb(83, 198, 83)",
        disabled: "rgb(200, 200, 200)"
    }
}

export const modalOpacityBackground = "rgba(30, 30, 30, 0.8)"

export const modifyColor = (baseColor: string, amount: number) => {
    const insideText = baseColor.substring(baseColor.indexOf("(") + 1, baseColor.indexOf(")"))
    const componentsSplitted = insideText.replace(" ", "").split(",")

    const redValue = Number.parseInt(componentsSplitted[0])
    const greenValue = Number.parseInt(componentsSplitted[1])
    const blueValue = Number.parseInt(componentsSplitted[2])

    const totalValue = redValue + greenValue + blueValue

    const redProportion = redValue / totalValue
    const greenProportion = greenValue / totalValue
    const blueProportion = blueValue / totalValue

    const newRed = Math.max(0, Math.min(Math.round(redValue + amount * redProportion), 255))
    const newGreen = Math.max(0, Math.min(Math.round(greenValue + amount * greenProportion), 255))
    const newBlue = Math.max(0, Math.min(Math.round(blueValue + amount * blueProportion), 255))

    return `rgb(${newRed}, ${newBlue}, ${newGreen})`
}