import React from 'react'
import { Input, InputProps, Text, View } from 'tamagui'
import ThemeColors from '../../utils/ThemeColors';


type CustomTextInputProps = InputProps & {
    error?: string;
}


export default function CustomTextInput(props: CustomTextInputProps) {
    const { error, m, mr, ml, mb, mt, ...otherProps } = props

    return (
        <View w={"100%"} m={m} mr={mr} ml={ml} mb={mb} mt={mt}>
            <Input
                focusStyle={{ borderColor: error ? ThemeColors.danger : ThemeColors.primary }}
                bc={error ? ThemeColors.danger : ThemeColors.primary}
                bw={2}
                selectionColor={error ? ThemeColors.danger : ThemeColors.primary}
                {...otherProps}
            />
            {
                error !== undefined && <Text ml={"$2"} fontSize={"$1"} color={ThemeColors.danger}>{error}{" "}</Text>
            }
        </View>
    )
}