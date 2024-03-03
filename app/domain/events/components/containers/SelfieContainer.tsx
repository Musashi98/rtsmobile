import { Image } from 'expo-image'
import React from 'react'
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { UserSelfie } from 'root/domain/auth/types/UserSelfie'
import { SelfieParams } from 'root/domain/system/types/SelfieParams'
import { ThemeColors } from 'root/domain/system/utils/ThemeColors'
import useStore from 'root/hooks/useStore'
import { View } from 'tamagui'


type SelfieContainerProps = {
    userSelfie: UserSelfie | null,
    isSelected?: boolean
} & TouchableOpacityProps

export default function SelfieContainer(props: SelfieContainerProps) {

    const { userSelfie, onPress, onLongPress, isSelected, ...otherProps } = props

    const { cardWidth: containerWidth } = useStore(state => state.selfieParams) as SelfieParams

    if (!props.userSelfie) {
        return <View w={containerWidth} h={containerWidth * 1.3} />
    }

    const { picture } = props.userSelfie

    const containerPressHandler = (event: GestureResponderEvent) => {
        onPress && onPress(event)
    }

    const containerLongPressHandler = (event: GestureResponderEvent) => {
        onLongPress && onLongPress(event)
    }

    return (
        <TouchableOpacity
            onPress={containerPressHandler}
            onLongPress={containerLongPressHandler}
            style={[SelfieContainerStyle, {
                backgroundColor: !isSelected ? "rgb(30, 30, 30)" : ThemeColors.light.primary,
                width: containerWidth,
                height: containerWidth * 1.3
            }]}
            {...otherProps}
            activeOpacity={0.7}
        >
            <View
                w={containerWidth * (isSelected ? 0.95 : 1)}
                h={(containerWidth * 1.3) * (isSelected ? 0.95 : 1)}
            >
                <Image source={picture} style={{ width: "100%", height: "100%", borderRadius: 6 }} />
            </View>
        </TouchableOpacity>
    )
}

const SelfieContainerStyle: ViewStyle = {
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center'
}