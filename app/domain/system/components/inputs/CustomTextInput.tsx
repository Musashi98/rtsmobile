import React from 'react'
import { Input, InputProps } from 'tamagui'


type CustomTextInputProps = InputProps


export default function CustomTextInput(props: CustomTextInputProps) {
    const { ...otherProps } = props

    return (
        <Input {...otherProps} />
    )
}