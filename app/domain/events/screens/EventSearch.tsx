import React from 'react'
import useResetNavigation from 'root/hooks/useResetNavigation'
import useStore from 'root/hooks/useStore'
import { EventCreationScreenRoute, LoginScreenRoute } from 'root/domain/system/routing/Routes'
import { Button, View } from 'tamagui'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { router } from 'expo-router'

export default function EventSearchScreen() {
    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const temporaryLogoutButtonPressHandler = async () => {
        await setUser(null)

        resetNavigation(LoginScreenRoute)
    }

    const temporaryCreateEventButtonPressHandler = () => {
        router.navigate(EventCreationScreenRoute)
    }

    return (
        <View f={1} jc={"center"} gap={"$3"}>
            <CustomButton
                onPress={temporaryLogoutButtonPressHandler}
                w={"$20"}
                als={"center"}
            >
                Logout
            </CustomButton>
            <CustomButton
                w={"$20"}
                als={"center"}
                onPress={temporaryCreateEventButtonPressHandler}
            >
                Create event
            </CustomButton>
        </View>
    )
}