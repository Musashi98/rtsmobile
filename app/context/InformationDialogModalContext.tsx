import { createContext, useState } from "react";
import { Dimensions, Modal } from "react-native";
import CustomButton from "root/domain/system/components/inputs/CustomButton";
import { modalOpacityBackground } from "root/domain/system/utils/ThemeColors";
import { Text, View, ViewProps } from "tamagui";


type ContextValue = (text: string) => void

const Context = createContext<ContextValue>(() => { })

type ProviderProps = ViewProps
type DialogState = {
    visible: boolean,
    text: string,
}

const { width: windowWidth } = Dimensions.get("window")

const Provider = (props: ProviderProps) => {

    const [dialogState, setDialogState] = useState<DialogState>({
        visible: false,
        text: "",
    })

    const showDialog = (text: string) => {
        setDialogState({
            visible: true,
            text,
        })
    }

    const closeDialog = () => {
        setDialogState({
            visible: false,
            text: "",
        })
    }

    return <Context.Provider value={showDialog}>
        {props.children}
        {
            dialogState.visible && <Modal statusBarTranslucent visible animationType="fade" transparent onRequestClose={closeDialog}>
                <View f={1} bg={modalOpacityBackground} jc={"center"} ai={"center"}>
                    <View w={windowWidth * 0.8} bg={"white"} br={10} px={"$4"} py={"$3"} gap="$4">
                        <Text>
                            {dialogState.text}
                        </Text>
                        <View w={"100%"} fd={"row"} jc={"center"}>
                            <CustomButton theme="primary" onPress={closeDialog}>
                                <Text>Ok</Text>
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        }
    </Context.Provider>
}

export default { Context, Provider }