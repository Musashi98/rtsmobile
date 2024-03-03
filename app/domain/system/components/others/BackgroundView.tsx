import { Image } from 'expo-image';
import React from 'react'
import { Dimensions } from 'react-native';
import { View, ViewProps } from 'tamagui'


const { height: windowHeight, width: windowWidth } = Dimensions.get("window")

type BackgroundViewProps = ViewProps & {
  image: string;
  imgAspectRatio?: number;
}

export default function BackgroundView(props: BackgroundViewProps) {
  const { image, imgAspectRatio, children, ...otherProps } = props

  return <View f={1} pos={"relative"} {...otherProps}>
    <View style={{
      width: windowWidth,
      height: windowHeight,
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgb(30, 30, 30)"
    }}>
      <Image
        source={image}
        style={{
          width: "100%",
          height: "100%",
        }}
        contentFit="cover"
      />
    </View>
    <View bg={"rgba(20, 20, 20, 0.7)"} w={windowWidth} h={windowHeight} position='absolute' top={0} left={0} />
    {children}
  </View>
}