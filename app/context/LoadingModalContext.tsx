import { createContext, useState } from "react";
import { Modal } from "react-native";
import { ThemeColors } from "root/domain/system/utils/ThemeColors";
import { Spinner, View, ViewProps } from "tamagui";


type LoadingModalContext = { loading: boolean, setLoading: (val: boolean) => void }
type ProviderProps = ViewProps


const Context = createContext<LoadingModalContext>({
    loading: false,
    setLoading: () => { }
})

const Provider = (props: ProviderProps) => {
    const { children } = props

    const [loading, setLoading] = useState(false)

    return <Context.Provider value={{ loading, setLoading }}>
        <View f={1}>
            {children}
            {
                loading && <Modal statusBarTranslucent visible transparent>
                    <View f={1} jc={"center"} bg={"rgba(100, 100, 100, 0.5)"}>
                        <Spinner size={"large"} color={ThemeColors.dark.primary} />
                    </View>
                </Modal>
            }
        </View>
    </Context.Provider>
}

export default { Context, Provider }