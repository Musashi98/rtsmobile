import { createContext, useState } from "react";
import { Dimensions, Modal, ViewProps } from "react-native";
import CustomButton from "root/domain/system/components/inputs/CustomButton";
import { Image, View } from "tamagui";


const { width: windowWidth } = Dimensions.get("window")

type ProviderProps = ViewProps

type ContextType = (url: string) => void

const Context = createContext<ContextType>(() => { })

const Provider = (props: ProviderProps) => {

    const { children } = props

    const [pictureUrl, setPictureUrl] = useState<string | null>(null)

    const showPicture = (uri: string) => {
        setPictureUrl(uri)
    }

    const closeModal = () => {
        setPictureUrl(null)
    }

    return <Context.Provider value={showPicture}>
        {children}
        {
            pictureUrl && <Modal visible animationType="fade" transparent onRequestClose={closeModal}>
                <View f={1} bg={"rgba(50, 50, 50, 0.7)"} jc={"center"} gap={"$4"}>
                    <Image src={pictureUrl} width={windowWidth} height={windowWidth * 4 / 3} />
                    <CustomButton als={"center"} onPress={closeModal}>Go back</CustomButton>
                </View>
            </Modal>
        }
    </Context.Provider>
}

export default { Context, Provider }