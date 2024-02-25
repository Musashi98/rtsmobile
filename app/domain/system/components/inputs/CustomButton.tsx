import React from 'react'
import { Button, ButtonProps } from 'tamagui'
import ThemeColors from '../../utils/ThemeColors'


type CustomButtonProps = ButtonProps & { theme?: "primary" | "danger" }

export default function CustomButton(props: CustomButtonProps) {
    const { children, disabled, theme, ...otherProps } = props

    return (
        <Button disabled={disabled} bg={disabled ? ThemeColors.disabled : ThemeColors[theme || "primary"]} {...otherProps}>
            {children}
        </Button>
    )
}