import { router } from 'expo-router'
import React, { useState } from 'react'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import Link from 'root/domain/system/components/text/Link'
import { Button, Text, View } from 'tamagui'
import { RegisterScreenRoute } from './Register'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { login } from '../services/firebaseAuthentication'
import useStore from 'root/hooks/useStore'
import useResetNavigation from 'root/hooks/useResetNavigation'
import { EventSearchScreenRoute } from 'root/domain/events/screens/EventSearch'

export default function LoginScreen() {
    const execute = useExecuteWithLoading()

    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginButtonPressHandler = async () => {
        const user = await execute(async () => {
            return login(email, password)
        })

        await setUser(user)

        resetNavigation(EventSearchScreenRoute)
    }

    const registerLinkPressHandler = () => {
        router.push(RegisterScreenRoute)
    }

    return (
        <View f={1} jc={'center'} px="$8">
            <CustomTextInput
                value={email}
                onChangeText={setEmail}
                mb={"$5"}
                placeholder="Type your email"
            />
            <CustomTextInput
                value={password}
                onChangeText={setPassword}
                mb={"$8"}
                secureTextEntry
                placeholder='Type your password'
            />
            <Button onPress={loginButtonPressHandler} bg={"$orange6"} mb={"$5"}>LOGIN</Button>
            <View fd={"row"} gap={"$1.5"} als={"center"}>
                <Text>You don't have an account?</Text>
                <Link onPress={registerLinkPressHandler}>Register</Link>
            </View>
        </View>
    )
}

export const LoginScreenRoute = "domain/auth/screens/Login"