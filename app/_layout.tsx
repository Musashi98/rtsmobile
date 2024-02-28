import React from 'react'
import tamaguiConfig from 'tamagui.config';
import LoadingModalContext from './context/LoadingModalContext'
import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings'
import SelfieViewerModalContext from './context/SelfieViewerModalContext';

export default function Layout(props: any) {
  return <TamaguiProvider config={tamaguiConfig}>
    <LoadingModalContext.Provider>
      <SelfieViewerModalContext.Provider>
        <SafeAreaProvider>
          <RootSiblingParent>
            <Stack screenOptions={{ headerShown: false }} />
          </RootSiblingParent>
        </SafeAreaProvider>
      </SelfieViewerModalContext.Provider>
    </LoadingModalContext.Provider>
  </TamaguiProvider>
}