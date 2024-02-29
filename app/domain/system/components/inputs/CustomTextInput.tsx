import React from 'react'
import { Input, InputProps, Label, Text, View } from 'tamagui'
import { ModeType, ThemeColors } from '../../utils/ThemeColors';


type CustomTextInputProps = InputProps & {
    error?: string;
    label?: string;
    mode?: ModeType;
}


export default function CustomTextInput(props: CustomTextInputProps) {
    const { error, label, mode, id, m, mr, ml, mb, mt, ...otherProps } = props

    return (
        <View w={"100%"} m={m} mr={mr} ml={ml} mb={mb} mt={mt}>
            {
                label && <Label color={mode === "dark" ? "white" : undefined} htmlFor={id || label || ""}>{label}</Label>
            }
            <Input
                id={id || label || ""}
                focusStyle={{ borderColor: error ? ThemeColors[mode || "light"].danger : ThemeColors[mode || "light"].primary }}
                bc={error ? ThemeColors[mode || "light"].danger : ThemeColors[mode || "light"].primary}
                bw={2}
                selectionColor={error ? ThemeColors[mode || "light"].danger : ThemeColors[mode || "light"].primary}
                {...otherProps}
            />
            {
                error !== undefined && <Text ml={"$2"} mt={"$1"} fontSize={"$2"} color={ThemeColors[mode || "light"].danger}>{error}{" "}</Text>
            }
        </View>
    )
}