import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import Link from 'root/domain/system/components/text/Link'
import { View, Text, ScrollView } from 'tamagui'
import { register } from '../services/UserAuth'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import useStore from 'root/hooks/useStore'
import useResetNavigation from 'root/hooks/useResetNavigation'
import { isValidEmail, isValidName, isValidPassword } from '../utils/UserInfoValidations'
import { useToast } from 'root/hooks/useToast'
import { traduceFirebaseError } from 'root/domain/system/utils/FirebaseErrors'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { EventSearchScreenRoute } from 'root/domain/system/routing/Routes'
import Title from 'root/domain/system/components/text/Title'
import { Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'


const { height: windowHeight } = Dimensions.get("window")

export default function RegisterScreen() {
    const executeWithLoading = useExecuteWithLoading()

    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const showToast = useToast()

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const nameModifiedRef = useRef(false)

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const emailModifiedRef = useRef(false)

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const passwordModifiedRef = useRef(false)

    useEffect(() => {
        if (nameModifiedRef.current) {
            const validationResult = isValidName(name)

            if (validationResult.ok) {
                setNameError("")
            }
            else {
                setNameError(validationResult.motive)
            }
        }
        else {
            nameModifiedRef.current = true
        }
    }, [name])

    useEffect(() => {
        if (emailModifiedRef.current) {
            const validationResult = isValidEmail(email)

            if (validationResult.ok) {
                setEmailError("")
            }
            else {
                setEmailError(validationResult.motive)
            }
        }
        else {
            emailModifiedRef.current = true
        }
    }, [email])

    useEffect(() => {
        if (passwordModifiedRef.current) {
            const validationResult = isValidPassword(password)

            if (validationResult.ok) {
                setPasswordError("")
            }
            else {
                setPasswordError(validationResult.motive)
            }
        }
        else {
            passwordModifiedRef.current = true
        }

    }, [password])

    const registerButtonPressHandler = async () => {
        const registerResult = await executeWithLoading(async () => {
            return register(name, email, password)
        })

        if ("error" in registerResult) {
            showToast({ text: traduceFirebaseError(registerResult.error), theme: "danger" })
            return
        }

        await setUser(registerResult)

        resetNavigation(EventSearchScreenRoute)
    }

    const loginLinkPressHandler = () => {
        router.back()
    }

    return (
        <View f={1}>
            <StatusBar translucent style="dark" />
            <ScrollView>
                <View mih={windowHeight} jc={"center"} px="$8" gap={"$6"}>
                    <Title als={"center"} />
                    <View>
                        <CustomTextInput
                            id='RegisterName'
                            label='Name'
                            value={name}
                            onChangeText={setName}
                            mb={"$1"}
                            placeholder="Type your name"
                            error={nameError}
                        />
                        <CustomTextInput
                            id='RegisterEmail'
                            label='Email'
                            value={email}
                            onChangeText={setEmail}
                            mb={"$1"}
                            placeholder="Type your email"
                            error={emailError}
                        />
                        <CustomTextInput
                            id='RegisterPassword'
                            label='Password'
                            value={password}
                            onChangeText={setPassword}
                            mb={"$6"}
                            secureTextEntry
                            placeholder='Type your password'
                            error={passwordError}
                        />
                        <CustomButton
                            disabled={email.length === 0 || password.length === 0 || emailError !== "" || passwordError !== ""}
                            onPress={registerButtonPressHandler}
                            style={{ marginBottom: 10 }}
                        >
                            <Text>REGISTER</Text>
                        </CustomButton>
                        <View fd={"row"} gap={"$1.5"} als={"center"}>
                            <Text>You already have an account?</Text>
                            <Link onPress={loginLinkPressHandler}>Login</Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

