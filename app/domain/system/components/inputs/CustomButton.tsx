import React from 'react'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ModeType, ThemeColors, ThemeType, modifyColor } from '../../utils/ThemeColors'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'


type CustomButtonProps = { theme?: ThemeType, mode?: ModeType } & TouchableOpacityProps

const getGradientColorsFromTheme = (theme?: ThemeType, disabled?: boolean) => {

    if (disabled) {
        return [ThemeColors.light.disabled, ThemeColors.light.disabled]
    }

    switch (theme) {
        case "primary": {
            return [ThemeColors.dark.primary, ThemeColors.light.primary]
        }
        case "secondary": {
            return [ThemeColors.dark.secondary, ThemeColors.dark.secondary]
        }
        default: {
            return [ThemeColors.dark.primary, ThemeColors.light.primary]
        }
    }
}

export default function CustomButton(props: CustomButtonProps) {
    const { children, disabled, theme, mode, ...otherProps } = props

    const gradientColors = getGradientColorsFromTheme(theme, disabled)

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} {...otherProps}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                w="auto"
                h={"$4"}
                br={6}
                py="$3"
                px="$3"
                jc={"center"}
                fd={"row"}
                ai={"center"}
                gap={2}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}