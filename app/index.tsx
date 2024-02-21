import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from 'tamagui.config';
import { LoadingScreen } from './domain/system/screens/Loading';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <LoadingScreen />
    </TamaguiProvider>
  );
}
