import React from 'react'
import { Text, TextProps } from 'tamagui'


type LinkProps = TextProps


export default function Link(props: LinkProps) {
    const { children, ...otherProps } = props

    return (
        <Text col={"$orange8"} textDecorationLine={"underline"} {...otherProps}>
            {children}
        </Text>
    )
}