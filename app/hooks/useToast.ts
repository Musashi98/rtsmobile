import Toast, { ToastOptions } from "react-native-root-toast"
import ThemeColors from "root/domain/system/utils/ThemeColors"

type ToastTheme = "primary" | "danger" | "success"

export const useToast = () => {
    const showToast = (params: { text: string, theme?: ToastTheme } & ToastOptions) => {
        const { text, theme, ...otherOptions } = params

        Toast.show(text, {
            backgroundColor: ThemeColors[theme || "primary"],
            opacity: 1,
            ...otherOptions
        })
    }

    return showToast
}