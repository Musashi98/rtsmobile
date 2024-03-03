import React from 'react'
import { Text, TextProps } from 'tamagui'
import { ThemeColors } from '../../utils/ThemeColors'


type LinkProps = TextProps


export default function Link(props: LinkProps) {
    const { children, ...otherProps } = props

    return (
        <Text col={ThemeColors.dark.primary} textDecorationLine={"underline"} {...otherProps}>
            {children}
        </Text>
    )
}