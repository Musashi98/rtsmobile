import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';
import { Image, ImageProps, Text, View, ViewProps } from 'tamagui'


const { height: windowHeight, width: windowWidth } = Dimensions.get("window")

const windowAspectRatio = windowWidth / windowHeight

type BackgroundViewProps = ViewProps & {
  image: string;
  imgAspectRatio?: number;
}

export default function BackgroundView(props: BackgroundViewProps) {
  const { image, imgAspectRatio, children, ...otherProps } = props

  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(imgAspectRatio !== undefined ? imgAspectRatio : null)

  useEffect(() => {
    if (imageAspectRatio === null)
      updateImageAspectRatio()
  }, [imageAspectRatio])

  const updateImageAspectRatio = () => {
    Image.getSize(image, (width, height) => {
      setImageAspectRatio(width / height)
    })
  }

  return <View f={1} pos={"relative"} {...otherProps}>
    {
      imageAspectRatio &&
      <Image
        src={image}
        w={imageAspectRatio > windowAspectRatio ? windowHeight * imageAspectRatio : windowWidth}
        h={imageAspectRatio > windowAspectRatio ? windowHeight : windowWidth / imageAspectRatio}
        position='absolute'
        top={0}
        left={0}
      />
    }
    <View bg={"rgba(20, 20, 20, 0.7)"} w={windowWidth} h={windowHeight} position='absolute' top={0} left={0} />
    {children}
  </View>
}