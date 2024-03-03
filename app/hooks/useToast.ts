import Toast, { ToastOptions } from "react-native-root-toast"
import { ModeType, ThemeColors } from "root/domain/system/utils/ThemeColors"

type ToastTheme = "primary" | "danger" | "success"

export const useToast = () => {
    const showToast = (params: { text: string, theme?: ToastTheme, mode?: ModeType } & ToastOptions) => {
        const { text, theme, mode, ...otherOptions } = params

        Toast.show(text, {
            backgroundColor: ThemeColors[mode || "light"][theme || "primary"],
            textColor: "black",
            opacity: 1,
            containerStyle: {
                borderRadius: 20,
                padding: 30
            },
            animation: true,
            ...otherOptions
        })
    }

    return showToast
}