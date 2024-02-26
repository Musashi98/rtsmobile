import React, { useEffect, useRef, useState } from 'react'
import useResetNavigation from 'root/hooks/useResetNavigation'
import useStore from 'root/hooks/useStore'
import { EventHomeScreenRoute, LoginScreenRoute } from 'root/domain/system/routing/Routes'
import { Text, View } from 'tamagui'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { router } from 'expo-router'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import { isValidEventCode } from '../utils/EventInfoValidations'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { useToast } from 'root/hooks/useToast'
import { firebaseGetEvent } from 'root/domain/system/services/FirebaseDb'

export default function EventSearchScreen() {
    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const executeWithLoading = useExecuteWithLoading()

    const showToast = useToast()

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

            router.push(EventHomeScreenRoute)
        }
    }

    const temporaryLogoutButtonPressHandler = async () => {
        await setUser(null)

        resetNavigation(LoginScreenRoute)
    }

    return (
        <View f={1} jc={"center"} px={"$8"}>
            <Text>Select an event code:</Text>
            <CustomTextInput
                value={code}
                onChangeText={setCode}
                placeholder='Type event code'
                mb={"$4"}
                error={codeError}
                maxLength={6}
            />
            <CustomButton
                disabled={code === "" || codeError !== ""}
                mb={"$10"}
                onPress={searchEventButtonPressHandler}
            >
                Search event
            </CustomButton>
            <CustomButton
                onPress={temporaryLogoutButtonPressHandler}
            >
                Logout
            </CustomButton>
        </View>
    )
}