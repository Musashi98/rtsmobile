import { useRootNavigationState } from 'expo-router';
import { LoadingScreen } from './domain/system/screens/Loading';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key || !loaded) return null;

  return <LoadingScreen />
}
