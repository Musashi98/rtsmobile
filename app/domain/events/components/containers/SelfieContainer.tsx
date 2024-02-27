import React from 'react'
import { UserSelfie } from 'root/domain/auth/types/UserSelfie'
import { SelfieParams } from 'root/domain/system/types/SelfieParams'
import ThemeColors from 'root/domain/system/utils/ThemeColors'
import useStore from 'root/hooks/useStore'
import { View, Text } from 'tamagui'


type SelfieContainerProps = {
    userSelfie: UserSelfie
}

export default function SelfieContainer(props: SelfieContainerProps) {
    const { picture, description } = props.userSelfie

    const { cardWidth: containerWidth } = useStore(state => state.selfieParams) as SelfieParams

    return (
        <View w={containerWidth} h={containerWidth * 1.3} br={4} bg={"$white1"} overflow={"hidden"}>
            <View h={"70%"}>
                {/* HERE GOES THE SELFIE */}
            </View>
            <View h={"30%"} p={"$2"} bg={ThemeColors.primary} ai={"center"} jc={"center"}>
                <Text ta={"center"}>{description}</Text>
            </View>
        </View>
    )
}