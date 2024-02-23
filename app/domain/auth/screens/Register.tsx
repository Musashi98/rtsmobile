import { router } from 'expo-router'
import React, { useState } from 'react'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import Link from 'root/domain/system/components/text/Link'
import { Button, View, Text } from 'tamagui'
import { register } from '../services/firebaseAuthentication'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { fromFirebaseUserToAppUser } from '../utils/UserConverter'
import useStore from 'root/hooks/useStore'
import useResetNavigation from 'root/hooks/useResetNavigation'
import { EventSearchScreenRoute } from 'root/domain/events/screens/EventSearch'

export default function RegisterScreen() {
    const execute = useExecuteWithLoading()

    const setUser = useStore(state => state.setUser)

    const resetNavigation = useResetNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerButtonPressHandler = async () => {
        const user = await execute(async () => {
            return register(name, email, password)
        })

        await setUser(user)

        resetNavigation(EventSearchScreenRoute)
    }

    const loginLinkPressHandler = () => {
        router.back()
    }

    return (
        <View f={1} jc={'center'} px="$8">
            <CustomTextInput
                value={name}
                onChangeText={setName}
                mb={"$5"}
                placeholder="Type your name"
            />
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
            <Button onPress={registerButtonPressHandler} bg={"$orange6"} mb={"$5"}>REGISTER</Button>
            <View fd={"row"} gap={"$1.5"} als={"center"}>
                <Text>You already have an account?</Text>
                <Link onPress={loginLinkPressHandler}>Login</Link>
            </View>
        </View>
    )
}

export const RegisterScreenRoute = "domain/auth/screens/Register"