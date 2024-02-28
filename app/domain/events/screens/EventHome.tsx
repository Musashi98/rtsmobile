import React from 'react'
import useStore from 'root/hooks/useStore'
import { AppEvent } from '../types/AppEvent'
import BackgroundView from 'root/domain/system/components/others/BackgroundView'
import { Text, View } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { router } from 'expo-router'
import { SelfieCameraScreenRoute, EventSelfiesScreenRoute, EventSearchScreenRoute } from 'root/domain/system/routing/Routes'
import BackButton from 'root/domain/system/components/others/BackButton'


export default function EventHomeScreen() {

    const insets = useSafeAreaInsets()

    const event = useStore(state => state.event) as AppEvent
    const setEvent = useStore(state => state.setEvent)

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

    return (
        <BackgroundView image={event.picture}>
            <View f={1} pt={insets.top} pb={insets.bottom + 10} px={"$4"} justifyContent="space-between">
                <BackButton onPress={backButtonPressHandler} />
                <CustomButton onPress={takeASelfieButtonPressHandler}>Take a selfie</CustomButton>
                <View fd={"row"} jc={"space-between"} ai={"center"}>
                    <View>
                        <Text color={"white"} fontSize={"$8"} fontWeight={"bold"}>{event.name}</Text>
                        <Text color={"white"}>{(new Date(event.dateNumber)).toDateString()}</Text>
                    </View>
                    <CustomButton onPress={mySelfiesButtonPressHandler} als={"center"}>
                        My selfies
                    </CustomButton>
                </View>
            </View>
        </BackgroundView>
    )
}