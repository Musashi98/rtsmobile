import { router } from "expo-router"


const useResetNavigation = () => {
    const resetNavigation = (initialRoute: string) => {
        while (router.canGoBack()) {
            router.back()
        }

        router.replace(initialRoute)
    }

    return resetNavigation
}

export default useResetNavigation