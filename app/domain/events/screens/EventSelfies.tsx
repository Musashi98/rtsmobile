import React from 'react'
import BackgroundView from 'root/domain/system/components/others/BackgroundView'
import useStore from 'root/hooks/useStore'
import { View, Text } from 'tamagui'
import { AppEvent } from '../types/AppEvent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from 'root/domain/system/components/others/BackButton'
import SelfieContainer from '../components/containers/SelfieContainer'
import { FlatList } from 'react-native'
import { UserSelfie } from 'root/domain/auth/types/UserSelfie'
import { SelfieParams } from 'root/domain/system/types/SelfieParams'
import { minimumGapBetweenSelfies } from 'root/domain/system/configurations/AppConfigParams'
import { AppUser } from 'root/domain/auth/types/AppUser'


export default function EventSelfies() {

    const insets = useSafeAreaInsets()

    const { columnCount: selfiesPerRow } = useStore(state => state.selfieParams) as SelfieParams

    const event = useStore(state => state.event) as AppEvent
    const selfies = useStore(state => (state.user as AppUser).selfies.filter(slf => slf.event === event.code))

    const itemsToRender: (UserSelfie | null)[] = [...selfies]

    if (itemsToRender.length % selfiesPerRow !== 0) {
        const toInsertCount = selfiesPerRow - itemsToRender.length % selfiesPerRow

        for (let i = 0; i < toInsertCount; i++) {
            itemsToRender.push(null)
        }
    }

    const selfieRender = (params: { item: UserSelfie | null, index: number }) => {
        return <View f={1} ai={'center'} mb={minimumGapBetweenSelfies}><SelfieContainer userSelfie={params.item} /></View>
    }

    return (
        <BackgroundView image={event.picture}>
            <View f={1} pt={insets.top} px={minimumGapBetweenSelfies}>
                <View fd={"row"} jc={"center"} mb={"$3"}>
                    <View pos={"absolute"} left={0} als={"center"}>
                        <BackButton />
                    </View>
                    <View ai={"center"}>
                        <Text color={"white"} fontSize={"$8"} fontWeight={"bold"}>Selfies</Text>
                        <Text color={"white"}>Total: {selfies.length}</Text>
                    </View>
                </View>
                <FlatList
                    data={itemsToRender}
                    keyExtractor={(selfie, index) => `selfie_${index}`}
                    renderItem={selfieRender}
                    numColumns={selfiesPerRow}
                />
            </View>
        </BackgroundView>
    )
}