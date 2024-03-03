import React, { useEffect, useRef, useState } from 'react'
import useResetNavigation from 'root/hooks/useResetNavigation'
import useStore from 'root/hooks/useStore'
import { EventHomeScreenRoute, LoginScreenRoute } from 'root/domain/system/routing/Routes'
import { ScrollView, Text, View } from 'tamagui'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { router } from 'expo-router'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import { isValidEventCode } from '../utils/EventInfoValidations'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { useToast } from 'root/hooks/useToast'
import { firebaseGetEvent } from 'root/domain/system/services/FirebaseDb'
import { Dimensions } from 'react-native'
import BackgroundView from 'root/domain/system/components/others/BackgroundView'
import { AntDesign, Feather, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons'
import useConfirmationDialog from 'root/hooks/useConfirmationDialog'


const { height: windowHeight } = Dimensions.get("window")

export default function EventSearchScreen() {
    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const executeWithLoading = useExecuteWithLoading()

    const showToast = useToast()

    const showConfirmationDialog = useConfirmationDialog()

    const [code, setCode] = useState("")
    const [codeError, setCodeError] = useState("")
    const codeModifiedRef = useRef(false)

    const setEvent = useStore(state => state.setEvent)

    useEffect(() => {
        if (codeModifiedRef.current) {
            const validationResult = isValidEventCode(code)

            if (validationResult.ok) {
                setCodeError("")
            }
            else {
                setCodeError(validationResult.motive)
            }
        }
        else {
            codeModifiedRef.current = true
        }
    }, [code])

    const searchEventButtonPressHandler = async () => {
        const eventSearchResult = await executeWithLoading(async () => {
            return await firebaseGetEvent(code)
        })

        if ("error" in eventSearchResult) {
            showToast({
                text: eventSearchResult.error,
                theme: "danger"
            })
        }
        else {
            await setEvent(eventSearchResult)

            router.replace(EventHomeScreenRoute)
        }
    }

    const logoutUser = async () => {
        await setUser(null)

        resetNavigation(LoginScreenRoute)
    }

    const logoutButtonPressHandler = async () => {
        showConfirmationDialog({
            text: "Are you sure you want to logout from your account?",
            onPositive: logoutUser
        })
    }

    return (
        <View f={1} position='relative'>
            <BackgroundView imgAspectRatio={1} image={require("root/assets/images/background-event-search.jpg")}>
                <ScrollView>
                    <View mih={windowHeight} jc={"center"} px={"$8"}>
                        <CustomTextInput
                            id='EventCode'
                            label='Event Code'
                            mode='dark'
                            value={code}
                            onChangeText={setCode}
                            placeholder='Type event code'
                            mb={"$4"}
                            letterSpacing={2}
                            error={codeError}
                            maxLength={6}
                        />
                        <CustomButton
                            mode='light'
                            disabled={code === "" || codeError !== ""}
                            onPress={searchEventButtonPressHandler}
                        >
                            <View fd={'row'} ai={"center"} gap={4}>
                                <Text>Search event</Text>
                                <AntDesign name="search1" size={20} color="black" />
                            </View>
                        </CustomButton>
                        <View pos={"absolute"} b={"$8"} als={"center"} w={"100%"}>
                            <CustomButton
                                mode="dark"
                                theme={"secondary"}
                                onPress={logoutButtonPressHandler}
                            >
                                <View fd={"row"} ai={"center"} gap={4}>
                                    <Text color={"white"}>Logout</Text>
                                    <SimpleLineIcons name="logout" size={18} color="white" />
                                </View>
                            </CustomButton>
                        </View>
                    </View>
                </ScrollView>
            </BackgroundView>
        </View>
    )
}