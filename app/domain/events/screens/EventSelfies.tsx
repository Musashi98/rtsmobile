import React, { useEffect, useRef, useState } from 'react'
import BackgroundView from 'root/domain/system/components/others/BackgroundView'
import useStore from 'root/hooks/useStore'
import { View, Text } from 'tamagui'
import { AppEvent } from '../types/AppEvent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from 'root/domain/system/components/others/BackButton'
import SelfieContainer from '../components/containers/SelfieContainer'
import { BackHandler, FlatList, TouchableOpacity } from 'react-native'
import { UserSelfie } from 'root/domain/auth/types/UserSelfie'
import { SelfieParams } from 'root/domain/system/types/SelfieParams'
import { minimumGapBetweenSelfies } from 'root/domain/system/configurations/AppConfigParams'
import { AppUser } from 'root/domain/auth/types/AppUser'
import { AntDesign } from '@expo/vector-icons'
import { ThemeColors } from 'root/domain/system/utils/ThemeColors'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { firebaseUpdateUser } from 'root/domain/system/services/FirebaseDb'
import { firebaseDeleteSelfies } from 'root/domain/system/services/FirebaseStorage'
import { useToast } from 'root/hooks/useToast'
import useConfirmationDialog from 'root/hooks/useConfirmationDialog'
import ImagesViewerModal from 'root/domain/system/components/others/ImagesViewerModal'
import { StatusBar } from 'expo-status-bar'


export default function EventSelfies() {

    const insets = useSafeAreaInsets()
    const executeWithLoading = useExecuteWithLoading()
    const showToast = useToast()
    const showConfirmationDialog = useConfirmationDialog()

    const { columnCount: selfiesPerRow } = useStore(state => state.selfieParams) as SelfieParams

    const userId = useStore(state => (state.user as AppUser).id)
    const event = useStore(state => state.event) as AppEvent
    const selfies = useStore(state => (state.user as AppUser).selfies.filter(slf => slf.event === event.code))
    const updateUser = useStore(state => state.updateUser)

    const itemsToRender: (UserSelfie | null)[] = [...selfies]

    if (itemsToRender.length % selfiesPerRow !== 0) {
        const toInsertCount = selfiesPerRow - itemsToRender.length % selfiesPerRow

        for (let i = 0; i < toInsertCount; i++) {
            itemsToRender.push(null)
        }
    }

    const [selectingItems, setSelectingItems] = useState(false)

    const selectingItemsRef = useRef(selectingItems)
    selectingItemsRef.current = selectingItems

    const [itemsSelected, setItemsSelected] = useState<boolean[]>((new Array(selfies.length)).fill(false))

    const [inspectingImages, setInspectingImages] = useState(false)

    const inspectedImageIndex = useRef(0)

    useEffect(() => {
        const deviceBackButtonPressHandler = () => {
            if (selectingItemsRef.current) {
                leaveSelectingState()

                return true
            }
            else {
                return false
            }
        }

        BackHandler.addEventListener("hardwareBackPress", deviceBackButtonPressHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", deviceBackButtonPressHandler)
        }
    }, [])

    const inspectImage = (index: number) => {
        inspectedImageIndex.current = index
        setInspectingImages(true)
    }

    const closeImageViewer = () => {
        setInspectingImages(false)
    }

    const enterSelectingState = (index: number) => {
        setSelectingItems(true)
        toggleItemSelectionState(index)
    }

    const leaveSelectingState = () => {
        setSelectingItems(false)

        setItemsSelected((new Array(selfies.length)).fill(false))
    }

    const toggleItemSelectionState = (index: number) => {
        const newSelectedItems = [...itemsSelected]

        newSelectedItems[index] = !newSelectedItems[index]

        setItemsSelected(newSelectedItems)

        if (newSelectedItems.filter(value => value).length === 0) {
            setSelectingItems(false)
        }
    }

    const selfieContainerButtonPress = (index: number) => {
        if (!selectingItems) {
            inspectImage(index)
        }
        else {
            toggleItemSelectionState(index)
        }
    }

    const deleteSelfies = async () => {
        const urlsToDelete = itemsSelected.map((value, index) => {
            if (value) return selfies[index].picture

            return null
        }).filter((value) => value) as string[]


        const newSelfies = selfies.filter((selfie => !urlsToDelete.includes(selfie.picture)))

        const deleteSelfiesResult = await executeWithLoading(async () => {
            const updateUserError = await firebaseUpdateUser(userId, { selfies: newSelfies })

            if (updateUserError) {
                return updateUserError
            }

            const deleteSelfiesError = await firebaseDeleteSelfies(urlsToDelete)

            if (deleteSelfiesError) {
                return deleteSelfiesError
            }
        })

        if (deleteSelfiesResult) {
            showToast({ text: deleteSelfiesResult.module + ": " + deleteSelfiesResult.error, theme: "danger" })

            return
        }

        updateUser({ selfies: newSelfies })

        leaveSelectingState()
    }

    const selfieRender = (params: { item: UserSelfie | null, index: number }) => {
        return <View f={1} ai={'center'} mb={minimumGapBetweenSelfies}>
            <SelfieContainer
                userSelfie={params.item}
                onLongPress={!selectingItems ? () => { enterSelectingState(params.index) } : undefined}
                onPress={() => { selfieContainerButtonPress(params.index) }}
                isSelected={itemsSelected[params.index]}
            />
        </View>
    }

    const deleteSelfiesButtonPressHandler = () => {
        showConfirmationDialog({
            text: "Are you sure you want to delete these selfies?",
            onPositive: deleteSelfies
        })
    }

    return (
        <BackgroundView image={event.picture}>
            <StatusBar translucent style="light" />
            <View f={1} pt={insets.top} px={minimumGapBetweenSelfies}>
                <View fd={"row"} jc={"center"} mb={"$3"}>
                    <View pos={"absolute"} left={0} als={"center"}>
                        {
                            !selectingItems && <BackButton />
                        }
                        {
                            selectingItems && <TouchableOpacity onPress={leaveSelectingState} style={{ padding: 4 }}>
                                <Text color={"white"} fontSize={"$6"}>Cancel</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View ai={"center"}>
                        <Text color={"white"} fontSize={"$8"} fontWeight={"bold"}>Selfies</Text>
                        <Text color={"white"}>Total: {selfies.length}</Text>
                    </View>
                    {
                        selectingItems && <View pos={"absolute"} right={0} als={"center"}>
                            <TouchableOpacity onPress={deleteSelfiesButtonPressHandler} style={{ padding: 4 }}>
                                <AntDesign name="delete" size={28} color={ThemeColors.light.danger} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <FlatList
                    data={itemsToRender}
                    keyExtractor={(selfie, index) => `selfie_${index}`}
                    renderItem={selfieRender}
                    numColumns={selfiesPerRow}
                />
            </View>
            <ImagesViewerModal
                visible={inspectingImages}
                onClose={closeImageViewer}
                index={inspectedImageIndex.current}
                imageUrls={selfies.map((selfie) => ({ url: selfie.picture }))}
            />
        </BackgroundView>
    )
}