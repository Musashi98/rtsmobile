import Toast, { ToastOptions } from "react-native-root-toast"
import { ModeType, ThemeColors } from "root/domain/system/utils/ThemeColors"

type ToastTheme = "primary" | "danger" | "success"

export const useToast = () => {
    const showToast = (params: { text: string, theme?: ToastTheme, mode?: ModeType } & ToastOptions) => {
        const { text, theme, mode, ...otherOptions } = params

        Toast.show(text, {
            backgroundColor: ThemeColors[mode || "light"][theme || "primary"],
            textColor: "black",
            opacity: 0.8,
            containerStyle: {
                borderRadius: 4,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginBottom: 50
            },
            animation: true,
            ...otherOptions
        })
    }

    return showToast
}