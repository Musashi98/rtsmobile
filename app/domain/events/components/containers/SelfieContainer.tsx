import React from 'react'
import { TouchableOpacity } from 'react-native'
import { UserSelfie } from 'root/domain/auth/types/UserSelfie'
import { SelfieParams } from 'root/domain/system/types/SelfieParams'
import ThemeColors from 'root/domain/system/utils/ThemeColors'
import { useSelfieViewer } from 'root/hooks/useSelfieViewer'
import useStore from 'root/hooks/useStore'
import { View, Text, Image } from 'tamagui'


type SelfieContainerProps = {
    userSelfie: UserSelfie | null
}

export default function SelfieContainer(props: SelfieContainerProps) {

    const showSelfie = useSelfieViewer()

    const { cardWidth: containerWidth } = useStore(state => state.selfieParams) as SelfieParams

    if (!props.userSelfie) {
        return <View w={containerWidth} h={containerWidth * 1.3} />
    }

    const { picture, description } = props.userSelfie

    const containerButtonPressHandler = () => {
        showSelfie(picture)
    }

    return (
        <TouchableOpacity onPress={containerButtonPressHandler}>
            <View w={containerWidth} h={containerWidth * 1.3} br={4} bg={"$white1"} overflow={"hidden"}>
                <View f={1}>
                    <Image src={picture} width={containerWidth} height={containerWidth * 4 / 3} />
                </View>
                {/* <View h={"30%"} p={"$2"} bg={ThemeColors.primary} ai={"center"} jc={"center"}>
                <Text ta={"center"}>{description}</Text>
            </View> */}
            </View>
        </TouchableOpacity>
    )
}