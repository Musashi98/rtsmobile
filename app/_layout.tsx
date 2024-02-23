import React from 'react'
import tamaguiConfig from 'tamagui.config';
import LoadingModalContext from './context/LoadingModalContext'
import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'
import { LoadingScreenRoute } from './domain/system/screens/Loading';

export default function Layout(props: any) {
  return <TamaguiProvider config={tamaguiConfig}>
    <LoadingModalContext.Provider>
      <Stack screenOptions={{ headerShown: false }} />
    </LoadingModalContext.Provider>
  </TamaguiProvider>
}