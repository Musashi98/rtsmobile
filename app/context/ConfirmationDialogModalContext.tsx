import { createContext, useState } from "react";
import { Dimensions, Modal } from "react-native";
import CustomButton from "root/domain/system/components/inputs/CustomButton";
import { Text, View, ViewProps } from "tamagui";


type ContextValue = (params: { text: string, onPositive?: () => void, onNegative?: () => void }) => void

const Context = createContext<ContextValue>(() => { })

type ProviderProps = ViewProps
type DialogState = {
    visible: boolean,
    text: string,
    onPositive: () => void,
    onNegative: () => void
}

const { width: windowWidth } = Dimensions.get("window")

const Provider = (props: ProviderProps) => {

    const [dialogState, setDialogState] = useState<DialogState>({
        visible: false,
        text: "",
        onPositive: () => { },
        onNegative: () => { }
    })

    const showDialog = (params: { text: string, onPositive?: () => void, onNegative?: () => void }) => {
        const { text, onPositive, onNegative } = params

        setDialogState({
            visible: true,
            text,
            onPositive: () => {
                onPositive && onPositive()
                closeDialog()
            },
            onNegative: () => {
                onNegative && onNegative()
                closeDialog()
            }
        })

    }

    const closeDialog = () => {
        setDialogState({
            visible: false,
            text: "",
            onPositive: () => { },
            onNegative: () => { }
        })
    }

    return <Context.Provider value={showDialog}>
        {props.children}
        {
            dialogState.visible && <Modal statusBarTranslucent visible animationType="fade" transparent onRequestClose={closeDialog}>
                <View f={1} bg={"rgba(50, 50, 50, 0.7)"} jc={"center"} ai={"center"}>
                    <View w={windowWidth * 0.8} bg={"white"} br={10} px={"$4"} py={"$3"} gap="$4">
                        <Text>
                            {dialogState.text}
                        </Text>
                        <View w={"100%"} fd={"row"} jc={"space-around"}>
                            <CustomButton bTheme="primary" onPress={dialogState.onPositive}>
                                Accept
                            </CustomButton>
                            <CustomButton bTheme="secondary" onPress={dialogState.onNegative}>
                                Cancel
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        }
    </Context.Provider>
}

export default { Context, Provider }