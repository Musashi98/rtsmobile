import React, { useEffect, useRef, useState } from 'react'
import { BackHandler, Dimensions, Image, TouchableOpacity, ViewStyle } from 'react-native'
import { View } from 'tamagui'
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { router } from 'expo-router'
import { FlipType, ImageResult, manipulateAsync } from 'expo-image-manipulator'
import { AntDesign } from '@expo/vector-icons'
import useStore from 'root/hooks/useStore'
import { AppUser } from 'root/domain/auth/types/AppUser'
import { firebaseUploadUserSelfie } from '../services/FirebaseStorage'
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading'
import { AppEvent } from 'root/domain/events/types/AppEvent'
import { useToast } from 'root/hooks/useToast'
import { ThemeColors } from '../utils/ThemeColors'
import useInformationDialog from 'root/hooks/useInformationDialog'
import { StatusBar } from 'expo-status-bar'


const { width: windowWidth } = Dimensions.get("window")

export default function SelfieCamera() {

    const user = useStore(state => state.user) as AppUser
    const event = useStore(state => state.event) as AppEvent
    const pushSelfie = useStore(state => state.pushSelfie)

    const showToast = useToast()

    const showInformationDialog = useInformationDialog()

    const executeWithLoading = useExecuteWithLoading()

    const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions()

    const [imageUri, setImageUri] = useState<string | null>(null)

    const imageUriRef = useRef(imageUri)
    imageUriRef.current = imageUri

    const cameraRef = useRef<Camera>(null)

    useEffect(() => {
        const deviceBackButtonPressHandler = () => {
            if (imageUriRef.current) {
                setImageUri(null)

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

    useEffect(() => {
        if (!cameraPermission || !cameraPermission.granted) {
            makeCameraPermissionRequest()
        }
    }, [cameraPermission])

    const makeCameraPermissionRequest = async () => {
        let result = cameraPermission

        while (!result || (!result.granted && result.canAskAgain)) {
            await requestCameraPermission()
        }

        if (!result.canAskAgain) {
            showInformationDialog("You didn't give this app camera permissions and could not show the request popup anymore. You can turn camera permissions on by going to this device settings.")

            router.back()
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

            return await firebaseUploadUserSelfie(user.id, event.code, blob, generateNameForResource())
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
            <StatusBar translucent style="light" />
            <View f={1} />
            {
                (!cameraPermission || !cameraPermission.granted) && <View w={windowWidth} height={windowWidth * 4 / 3} bg={"black"} />
            }
            {
                !imageUri && cameraPermission && cameraPermission.granted && <Camera ref={cameraRef} type={CameraType.front} style={{ width: windowWidth, height: windowWidth * 4 / 3 }} />
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