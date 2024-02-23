import { useContext } from "react"
import LoadingModalContext from "root/context/LoadingModalContext"


const useExecuteWithLoading = () => {
    const { setLoading } = useContext(LoadingModalContext.Context)

    const executeWithLoading = async <T>(func: () => Promise<T>) => {
        setLoading(true)

        const result = await func()

        setLoading(false)

        return result
    }

    return executeWithLoading
}

export default useExecuteWithLoading