import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, Image, TouchableOpacity, ViewStyle } from 'react-native'
import { View } from 'tamagui'
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { router } from 'expo-router'
import { EventHomeScreenRoute } from '../routing/Routes'
import { FlipType, ImageResult, manipulateAsync } from 'expo-image-manipulator'
import { AntDesign } from '@expo/vector-icons'
import useStore from 'root/hooks/useStore'
import { AppUser } from 'root/domain/auth/types/AppUser'
import { uploadUserSelfie } from '../services/FirebaseStorage'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { AppEvent } from 'root/domain/events/types/AppEvent'
import { useToast } from 'root/hooks/useToast'
import { ThemeColors } from '../utils/ThemeColors'


const { width: windowWidth } = Dimensions.get("window")

export default function SelfieCamera() {

    const user = useStore(state => state.user) as AppUser
    const event = useStore(state => state.event) as AppEvent
    const pushSelfie = useStore(state => state.pushSelfie)

    const showToast = useToast()

    const executeWithLoading = useExecuteWithLoading()

    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions()

    const [imageUri, setImageUri] = useState<string | null>(null)

    const cameraRef = useRef<Camera>(null)

    useEffect(() => {
        if (!cameraPermission || !cameraPermission.granted) {
            makeCameraPermissionRequest()
        }
    }, [cameraPermission])

    const makeCameraPermissionRequest = async () => {
        let result = await requestCameraPermission()

        while (!result.granted && result.canAskAgain) {
            await requestCameraPermission()
        }

        if (!result.canAskAgain) {
            Alert.alert("Error", "You didn't give this app camera permissions and could not show the request popup anymore. You can turn camera permissions on by going to this device settings.")

            router.navigate(EventHomeScreenRoute)
        }
    }

    const takeSelfieButtonPressHandler = async () => {
        if (cameraRef.current) {
            const { uri }: CameraCapturedPicture = await cameraRef.current.takePictureAsync()

            const resultPhoto: ImageResult = await manipulateAsync(uri, [{ flip: FlipType.Horizontal }])

            setImageUri(resultPhoto.uri)
        }
    }

    const cancelPictureButtonPressHandler = () => {
        setImageUri(null)
    }

    const acceptImageButtonPressHandler = async () => {
        const uploadResult = await executeWithLoading(async () => {
            const uri = imageUri as string

            const response = await fetch(uri)

            const blob = await response.blob()

            return await uploadUserSelfie(user.id, event.code, blob, generateNameForResource())
        })

        if ("error" in uploadResult) {
            showToast({ text: "Error: " + uploadResult.error, theme: "danger" })
        }
        else {
            pushSelfie(uploadResult)
            router.back()
            showToast({ text: "Selfie uploaded", theme: "success" })
        }
    }

    const generateNameForResource = (): string => {
        const currentDate = new Date()
        return user.id + `-${currentDate.getSeconds()}-${currentDate.getMinutes()}-${currentDate.getHours()}-${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`
    }

    return (
        <View f={1} bg={"black"}>
            <View f={1} />
            {
                !imageUri && <Camera ref={cameraRef} type={CameraType.front} style={{ width: windowWidth, height: windowWidth * 4 / 3 }} />
            }
            {
                imageUri && <Image source={{ uri: imageUri }} style={{ width: windowWidth, height: windowWidth * 4 / 3 }} />
            }
            <View f={3} px="$4" fd={"row"} jc={!imageUri ? "center" : "space-between"} ai={"center"}>
                {
                    !imageUri && <TouchableOpacity
                        style={takePictureButtonOutline}
                        onPress={takeSelfieButtonPressHandler}
                    >
                        <View style={takePictureButtonStyle} />
                    </TouchableOpacity>
                }
                {
                    imageUri && <TouchableOpacity style={{ padding: 6 }} onPress={cancelPictureButtonPressHandler}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                }
                {
                    imageUri && <TouchableOpacity style={{ padding: 6 }} onPress={acceptImageButtonPressHandler}>
                        <AntDesign name="check" size={24} color={ThemeColors.light.success} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const takePictureButtonOutline: ViewStyle = {
    padding: 2,
    backgroundColor: "white",
    borderRadius: 1000000,
}

const takePictureButtonStyle: ViewStyle = {
    width: 60,
    height: 60,
    borderRadius: 1000000,
    backgroundColor: ThemeColors.dark.primary,
}