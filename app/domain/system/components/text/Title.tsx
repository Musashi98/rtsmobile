import React from 'react'
import { Text, TextProps } from 'tamagui'

type TitleProps = TextProps

export default function Title(props: TitleProps) {
    return (
        <Text {...props} fontWeight={"bold"} fontSize={"$8"}>RTS-MOBILE</Text>
    )
}