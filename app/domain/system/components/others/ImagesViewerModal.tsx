import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Modal, TouchableOpacity, ViewStyle } from 'react-native'
import ImageViewer, { ImageViewerPropsDefine } from 'react-native-image-zoom-viewer'
import { View } from 'tamagui'
import { ThemeColors } from '../../utils/ThemeColors'
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type'
import { Image } from 'expo-image'

type ImagesViewerModalProps = ImageViewerPropsDefine & {
    visible?: boolean,
    onClose?: () => void
}

const { width: windowWidth } = Dimensions.get("window")

export default function ImagesViewerModal(props: ImagesViewerModalProps) {
    const { visible, imageUrls, index, onClose } = props

    const miniaturesListRef = useRef<FlatList>(null)

    const [imageIndex, setImageIndex] = useState(index)

    useEffect(() => {
        goToImage(index || 0)
    }, [index])

    const renderMiniatures = (params: { item: IImageInfo, index: number }) => {
        return <TouchableOpacity onPress={() => { goToImage(params.index) }}>
            <Image source={params.item.url} style={{ width: 45, height: 60, borderRadius: 4 }} />
        </TouchableOpacity>
    }

    const goToImage = (index: number) => {
        if (miniaturesListRef.current) {
            setImageIndex(index)

            miniaturesListRef.current.scrollToOffset({ animated: true, offset: index * 45 + index * 6 })
        }
    }

    return (
        <Modal statusBarTranslucent visible={visible} animationType="fade" style={{ position: 'relative' }} onRequestClose={onClose}>
            <View f={1} bg={"black"}>
                <ImageViewer
                    loadingRender={() => { return <ActivityIndicator color={ThemeColors.light.primary} size={"large"} /> }} style={{ height: 100 }}
                    renderImage={(props) => { return <Image source={props.source.uri} style={{ width: windowWidth, height: windowWidth * 4 / 3 }} /> }}
                    renderIndicator={() => { return <View /> }}
                    index={imageIndex}
                    imageUrls={imageUrls}
                />

                <TouchableOpacity onPress={onClose} style={CloseButtonStyle} >
                    <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>

                <FlatList
                    ref={miniaturesListRef}
                    style={{
                        position: "absolute",
                        bottom: 10,
                        alignSelf: 'center',
                        height: 60,
                    }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 6, paddingHorizontal: windowWidth / 2 - 45 / 2 }}
                    horizontal
                    data={imageUrls}
                    renderItem={renderMiniatures}
                />
            </View>
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