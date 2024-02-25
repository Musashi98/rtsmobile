import React from 'react'
import tamaguiConfig from 'tamagui.config';
import LoadingModalContext from './context/LoadingModalContext'
import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings'

export default function Layout(props: any) {
  return <TamaguiProvider config={tamaguiConfig}>
    <LoadingModalContext.Provider>
      <SafeAreaProvider>
        <RootSiblingParent>
          <Stack screenOptions={{ headerShown: false }} />
        </RootSiblingParent>
      </SafeAreaProvider>
    </LoadingModalContext.Provider>
  </TamaguiProvider>
}