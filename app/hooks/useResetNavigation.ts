import { router } from "expo-router"


const useResetNavigation = () => {
    const resetNavigation = (initialRoute: string) => {
        while (router.canGoBack()) {
            router.back()
        }

        router.push(initialRoute)
    }

    return resetNavigation
}

export default useResetNavigation