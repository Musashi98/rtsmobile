import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'tamagui'
import { getLastSessionData } from '../services/LocalStorage'
import useStore from 'root/hooks/useStore'
import { EventHomeScreenRoute, EventSearchScreenRoute, LoginScreenRoute } from 'root/domain/system/routing/Routes'
import { calculateSelfieColumnCountAndWidth } from '../utils/Calculations'
import { minimumGapBetweenSelfies, selfieContainerMinimumWidth } from '../configurations/AppConfigParams'
import { Dimensions } from 'react-native'


const { width: windowWidth } = Dimensions.get("window")

export function LoadingScreen() {
    const setUser = useStore((state) => state.setUser)
    const setEvent = useStore((state) => state.setEvent)
    const setSelfieParams = useStore((state) => state.setSelfieParams)

    useEffect(() => {
        setSelfiesCardParams()
        recoverLastSession()
    }, [])

    const setSelfiesCardParams = () => {
        const selfieParams = calculateSelfieColumnCountAndWidth(
            selfieContainerMinimumWidth,
            windowWidth - minimumGapBetweenSelfies * 2,
            minimumGapBetweenSelfies
        )

        setSelfieParams(selfieParams)
    }

    const recoverLastSession = async () => {
        const { user, event } = await getLastSessionData()

        await setUser(user, true)
        await setEvent(event, true)

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

