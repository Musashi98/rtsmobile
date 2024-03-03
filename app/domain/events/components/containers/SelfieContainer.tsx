import React, { useRef } from 'react'
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { UserSelfie } from 'root/domain/auth/types/UserSelfie'
import { SelfieParams } from 'root/domain/system/types/SelfieParams'
import { ThemeColors } from 'root/domain/system/utils/ThemeColors'
import { useSelfieViewer } from 'root/hooks/useSelfieViewer'
import useStore from 'root/hooks/useStore'
import { View, Image } from 'tamagui'


type SelfieContainerProps = {
    userSelfie: UserSelfie | null,
    isSelected?: boolean
} & TouchableOpacityProps

export default function SelfieContainer(props: SelfieContainerProps) {

    const { userSelfie, onPress, onLongPress, isSelected, ...otherProps } = props

    const { cardWidth: containerWidth } = useStore(state => state.selfieParams) as SelfieParams

    const justMadeLongPress = useRef(false)

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
                backgroundColor: !isSelected ? "gray" : ThemeColors.dark.secondary,
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
                <Image src={picture} width={"100%"} height={"100%"} br={6} />
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