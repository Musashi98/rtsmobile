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


const mockSelfies: UserSelfie[] = [
    {
        event: "",
        picture: "asdqwe",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    },
    {
        event: "",
        picture: "ghjyy",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    },
    {
        event: "",
        picture: "ntyncbrt",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    },
    {
        event: "",
        picture: "retgsdcv",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    },
    {
        event: "",
        picture: "fnynyurg",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    },
    {
        event: "",
        picture: "htrgwdsc",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    },
    {
        event: "",
        picture: "egmudf",
        description: "Ashura maki setsuga tenikusu jushida mooosu"
    }
]

export default function EventSelfies() {

    const insets = useSafeAreaInsets()

    const event = useStore(state => state.event) as AppEvent

    const { columnCount: selfiesPerRow } = useStore(state => state.selfieParams) as SelfieParams

    const selfieRender = (params: { item: UserSelfie, index: number }) => {
        return <View f={1} ai={'center'} mb={minimumGapBetweenSelfies}><SelfieContainer userSelfie={params.item} /></View>
    }

    return (
        <BackgroundView image={event.picture}>
            <View f={1} pt={insets.top} px={minimumGapBetweenSelfies}>
                <BackButton />
                <FlatList
                    data={mockSelfies}
                    keyExtractor={(selfie) => selfie.picture}
                    renderItem={selfieRender}
                    numColumns={selfiesPerRow}
                />
            </View>
        </BackgroundView>
    )
}