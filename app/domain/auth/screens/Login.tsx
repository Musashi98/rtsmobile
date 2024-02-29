import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import Link from 'root/domain/system/components/text/Link'
import { ScrollView, Text, View } from 'tamagui'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { login } from '../services/UserAuth'
import useStore from 'root/hooks/useStore'
import useResetNavigation from 'root/hooks/useResetNavigation'
import { isValidEmail, isValidPassword } from '../utils/UserInfoValidations'
import { useToast } from 'root/hooks/useToast'
import { traduceFirebaseError } from 'root/domain/system/utils/FirebaseErrors'
import CustomButton from 'root/domain/system/components/inputs/CustomButton'
import { EventSearchScreenRoute, RegisterScreenRoute } from 'root/domain/system/routing/Routes'
import Title from 'root/domain/system/components/text/Title'
import { Dimensions } from 'react-native'


const { height: windowHeight } = Dimensions.get("window")

export default function LoginScreen() {
    const executeWithLoading = useExecuteWithLoading()

    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const showToast = useToast()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const emailModifiedRef = useRef(false)

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const passwordModifiedRef = useRef(false)

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

    const loginButtonPressHandler = async () => {
        const loginResult = await executeWithLoading(async () => {
            return login(email, password)
        })

        if ("error" in loginResult) {
            showToast({
                text: traduceFirebaseError(loginResult.error),
                theme: "danger",
                mode: 'dark'
            })
            return
        }

        await setUser(loginResult)

        resetNavigation(EventSearchScreenRoute)
    }

    const registerLinkPressHandler = () => {
        router.push(RegisterScreenRoute)
    }

    return (
        <View f={1}>
            <ScrollView>
                <View mih={windowHeight} jc={'center'} px="$8" gap={"$6"}>
                    <Title als={"center"} />
                    <View>
                        <CustomTextInput
                            id='LoginEmail'
                            label='Email'
                            value={email}
                            onChangeText={setEmail}
                            mb={"$2"}
                            placeholder="Type your email"
                            error={emailError}
                        />
                        <CustomTextInput
                            id='LoginPassword'
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
                            onPress={loginButtonPressHandler}
                            mb={"$3"}
                        >
                            LOGIN
                        </CustomButton>
                        <View fd={"row"} gap={"$1.5"} als={"center"}>
                            <Text>You don't have an account?</Text>
                            <Link onPress={registerLinkPressHandler}>Register</Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}