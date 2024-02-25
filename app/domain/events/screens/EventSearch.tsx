import React from 'react'
import useResetNavigation from 'root/hooks/useResetNavigation'
import useStore from 'root/hooks/useStore'
import { LoginScreenRoute } from 'root/domain/system/routing/Routes'
import { Button, View } from 'tamagui'

export default function EventSearchScreen() {
    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const temporaryLogoutButtonPressHandler = async () => {
        await setUser(null)

        resetNavigation(LoginScreenRoute)
    }

    return (
        <View f={1} jc={"center"}>
            <Button
                onPress={temporaryLogoutButtonPressHandler}
                w={"$20"}
                als={"center"}
                bg={"$orange6"}
            >
                Logout
            </Button>
        </View>
    )
}