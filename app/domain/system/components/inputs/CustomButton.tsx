import React from 'react'
import { Button, ButtonProps } from 'tamagui'
import { ModeType, ThemeColors, ThemeType } from '../../utils/ThemeColors'


type CustomButtonProps = ButtonProps & { theme?: ThemeType, mode?: ModeType }

export default function CustomButton(props: CustomButtonProps) {
    const { children, disabled, theme, mode, ...otherProps } = props

    return (
        <Button disabled={disabled} bg={disabled ? ThemeColors[mode || "light"].disabled : ThemeColors[mode || "light"][theme || "primary"]} {...otherProps}>
            {children}
        </Button>
    )
}