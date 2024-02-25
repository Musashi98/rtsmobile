import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'tamagui'
import { getLastSessionData } from '../services/LocalStorage'
import useStore from 'root/hooks/useStore'
import { EventHomeScreenRoute, EventSearchScreenRoute, LoginScreenRoute } from 'root/domain/system/routing/Routes'

export function LoadingScreen() {
    const setUser = useStore((state) => state.setUser)
    const setEvent = useStore((state) => state.setEvent)

    useEffect(() => {
        recoverLastSession()
    }, [])

    const recoverLastSession = async () => {
        const { user, event } = await getLastSessionData()

        setUser(user)
        setEvent(event)

        if (!user) {
            router.replace(LoginScreenRoute)
            return
        }

        if (!event) {
            router.replace(EventSearchScreenRoute)
            return
        }

        router.replace(EventHomeScreenRoute)
    }

    return (
        <View f={1} jc='center' ai='center'>
            <Text fontSize={"$5"}>LOADING...</Text>
        </View>
    )
}

