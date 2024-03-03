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
import { StatusBar } from 'expo-status-bar'


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
            <StatusBar translucent style="light" />
            <View f={1} pt={insets.top} pb={insets.bottom + 10} justifyContent="space-between">
                <View px={"$4"} mb="$3" fd={"row"} jc={"space-between"} ai={"center"}>
                    <BackButton onPress={backButtonPressHandler} />
                    <View f={1} ai={"center"}>
                        <Text numberOfLines={1} color={"white"} fontSize={"$8"} fontWeight={"bold"}>Event {event.code}</Text>
                    </View>
                    <TouchableOpacity style={{ padding: 6 }} onPress={watchEventPictureButtonHandler}>
                        <MaterialIcons name="image-search" size={26} color="white" />
                    </TouchableOpacity>
                </View>
                <View f={1} ov={"hidden"}>
                    <ScrollView>
                        <View px={"$4"}>
                            <View mb="$2">
                                <Text col={ThemeColors.light.primary} fontSize={"$6"} fontWeight={"bold"}>Event Name</Text>
                                <Text px="$2" col={"white"} fontSize={"$5"}>{event.name}</Text>
                            </View>
                            <View mb="$2">
                                <Text col={ThemeColors.light.primary} fontSize={"$6"} fontWeight={"bold"}>Date</Text>
                                <Text px="$2" col={"white"} fontSize={"$5"}>{(new Date(event.dateNumber)).toDateString()}</Text>
                            </View>
                            <View mb="$2">
                                <Text col={ThemeColors.light.primary} fontSize={"$6"} fontWeight={"bold"}>Location</Text>
                                <Text px="$2" col={"white"} fontSize={"$5"}>{event.location}</Text>
                            </View>
                            <View>
                                <Text col={ThemeColors.light.primary} fontSize={"$6"} fontWeight={"bold"}>Description</Text>
                                <Text px="$2" col={"white"} fontSize={"$5"}>{event.description}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View mt={"$3"} fd={"row"} jc={"space-around"}>
                    <CustomButton
                        mode='light'
                        theme="primary"
                        onPress={takeASelfieButtonPressHandler}
                    >
                        <Text>Take a selfie</Text>
                        <Entypo name="camera" size={20} color="black" />
                    </CustomButton>
                    <CustomButton
                        mode='light'
                        theme="primary"
                        onPress={mySelfiesButtonPressHandler}
                    >
                        <Text>My selfies</Text>
                        <MaterialCommunityIcons name="image-multiple" size={24} color="black" />
                    </CustomButton>
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