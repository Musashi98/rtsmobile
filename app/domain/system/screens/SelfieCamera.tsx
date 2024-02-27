import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { View } from 'tamagui'
import ThemeColors from '../utils/ThemeColors'

export default function SelfieCamera() {
    const takeSalfieButtonPressHandler = () => {

    }

    return (
        <View pos={"relative"} f={1} bg={"black"}>
            <View f={1} bg={"gray"}>
                {/* HERE GOES THE CAMERA */}
            </View>
            <TouchableOpacity
                style={takePictureButtonStyle}
                onPress={takeSalfieButtonPressHandler}
            />
        </View>
    )
}

const takePictureButtonStyle: ViewStyle = {
    position: "absolute",
    bottom: 30,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 1000000,
    backgroundColor: ThemeColors.primary,
}