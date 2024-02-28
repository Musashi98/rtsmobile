import React from 'react'
import BackgroundView from 'root/domain/system/components/others/BackgroundView'
import useStore from 'root/hooks/useStore'
import { View } from 'tamagui'
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

    const selfies = useStore(state => (state.user as AppUser).selfies)

    const itemsToRender: (UserSelfie | null)[] = [...selfies]

    if (itemsToRender.length % selfiesPerRow !== 0) {
        const toInsertCount = selfiesPerRow - itemsToRender.length % selfiesPerRow

        for (let i = 0; i < toInsertCount; i++) {
            itemsToRender.push(null)
        }
    }

    const event = useStore(state => state.event) as AppEvent

    const selfieRender = (params: { item: UserSelfie | null, index: number }) => {
        return <View f={1} ai={'center'} mb={minimumGapBetweenSelfies}><SelfieContainer userSelfie={params.item} /></View>
    }

    return (
        <BackgroundView image={event.picture}>
            <View f={1} pt={insets.top} px={minimumGapBetweenSelfies}>
                <BackButton />
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