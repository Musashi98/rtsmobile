import React, { useState } from 'react'
import useStore from 'root/hooks/useStore'
import { AppEvent } from '../types/AppEvent'
import BackgroundView from 'root/domain/system/components/others/BackgroundView'
import { ScrollView, Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { router } from 'expo-router'
import { SelfieCameraScreenRoute, EventSelfiesScreenRoute, EventSearchScreenRoute } from 'root/domain/system/routing/Routes'
import BackButton from 'root/domain/system/components/others/BackButton'
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { ThemeColors } from 'root/domain/system/utils/ThemeColors'
import { TouchableOpacity } from 'react-native'
import ImagesViewerModal from 'root/domain/system/components/others/ImagesViewerModal'


export default function EventHomeScreen() {

    const insets = useSafeAreaInsets()

    const event = useStore(state => state.event) as AppEvent
    const setEvent = useStore(state => state.setEvent)

    const [inspectingImage, setInspectingImage] = useState(false)

    const closeImageViewer = () => [
        setInspectingImage(false)
    ]

    const mySelfiesButtonPressHandler = () => {
        router.push(EventSelfiesScreenRoute)
    }

    const takeASelfieButtonPressHandler = () => {
        router.navigate(SelfieCameraScreenRoute)
    }

    const backButtonPressHandler = async () => {
        router.replace(EventSearchScreenRoute)
        await setEvent(null)
    }

    const watchEventPictureButtonHandler = () => {
        setInspectingImage(true)
    }

    return (
        <BackgroundView image={event.picture}>
            <View f={1} pt={insets.top} pb={insets.bottom + 10} justifyContent="space-between">
                <View px={"$4"} mb="$3" fd={"row"} jc={"space-between"} ai={"center"}>
                    <BackButton onPress={backButtonPressHandler} />
                    <View ai={"center"}>
                        <Text color={"white"} fontSize={"$8"} fontWeight={"bold"}>{event.name}</Text>
                        <Text color={"white"}>{(new Date(event.dateNumber)).toDateString()}</Text>
                    </View>
                    <TouchableOpacity style={{ padding: 6 }} onPress={watchEventPictureButtonHandler}>
                        <MaterialIcons name="image-search" size={26} color="white" />
                    </TouchableOpacity>
                </View>
                <View f={1} ov={"hidden"}>
                    <ScrollView>
                        <View px={"$4"}>
                            <View mb="$2">
                                <Text col={ThemeColors.dark.primary} fontSize={"$6"} fontWeight={"bold"}>Location</Text>
                                <Text col={"white"} fontSize={"$6"}>{event.location}</Text>
                            </View>
                            <View>
                                <Text col={ThemeColors.dark.primary} fontSize={"$6"} fontWeight={"bold"}>Description</Text>
                                <Text col={"white"} fontSize={"$6"}>{event.description}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View mt={"$3"} fd={"row"} jc={"space-around"}>
                    <CustomButton mode='dark' bTheme="secondary" als={"center"} onPress={takeASelfieButtonPressHandler}>Take a selfie<Entypo name="camera" size={20} color="black" /></CustomButton>
                    <CustomButton mode='dark' bTheme="secondary" als={"center"} onPress={mySelfiesButtonPressHandler}>Watch selfies<MaterialCommunityIcons name="image-multiple" size={24} color="black" /></CustomButton>
                </View>
            </View>
            <ImagesViewerModal
                visible={inspectingImage}
                onClose={closeImageViewer}
                index={0}
                imageUrls={[{ url: event.picture }]}
            />
        </BackgroundView>
    )
}