import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, TouchableOpacity, ViewStyle } from 'react-native'
import ImageViewer, { ImageViewerPropsDefine } from 'react-native-image-zoom-viewer'
import { View } from 'tamagui'

type ImagesViewerModalProps = ImageViewerPropsDefine & {
    visible?: boolean,
    onClose?: () => void
}

export default function ImagesViewerModal(props: ImagesViewerModalProps) {
    const { visible, imageUrls, index, onClose } = props

    return (
        <Modal statusBarTranslucent visible={visible} animationType="fade" style={{ position: 'relative', }} onRequestClose={onClose}>
            <ImageViewer style={{ height: 100 }} renderIndicator={() => { return <View /> }} index={index} imageUrls={imageUrls} />
            <TouchableOpacity onPress={onClose} style={CloseButtonStyle} >
                <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
        </Modal>
    )
}


const CloseButtonStyle: ViewStyle = {
    position: "absolute",
    right: 40,
    top: 40,
    padding: 6,
    borderRadius: 1000000,
    backgroundColor: "rgba(180, 180, 180, 0.8)"
}