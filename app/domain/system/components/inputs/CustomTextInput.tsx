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
                focusStyle={{ borderColor: error ? ThemeColors.light.danger : undefined }}
                bc={error ? ThemeColors.light.danger : undefined}
                bw={2}
                selectionColor={ThemeColors.dark.secondary}
                {...otherProps}
            />
            {
                error !== undefined && <Text ml={"$2"} mt={"$1"} fontSize={"$2"} color={ThemeColors.light.danger}>{error}{" "}</Text>
            }
        </View>
    )
}