import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'

type BackButtonProps = TouchableOpacityProps

export default function BackButton(props: BackButtonProps) {

    const { onPress, ...otherProps } = props

    const backButtonPressHandler = () => {
        router.back()
    }

    return (
        <TouchableOpacity
            onPress={onPress || backButtonPressHandler}
            style={{ padding: 6, borderRadius: 1000000 }}
            {...otherProps}
        >
            <Entypo name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
    )
}