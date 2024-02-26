import React from 'react'
import { Dimensions } from 'react-native';
import { Image, ImageProps, Text, View, ViewProps } from 'tamagui'


const { height: windowHeight, width: windowWidth } = Dimensions.get("window")

type BackgroundViewProps = ViewProps & {
  image: string;
}

export default function BackgroundView(props: BackgroundViewProps) {
  const { image, children, ...otherProps } = props

  return <View f={1} pos={"relative"} {...otherProps}>
    <Image src={image} w={windowWidth} h={windowHeight} position='absolute' top={0} left={0} />
    <View bg={"rgba(20, 20, 20, 0.7)"} w={windowWidth} h={windowHeight} position='absolute' top={0} left={0} />
    {children}
  </View>
}