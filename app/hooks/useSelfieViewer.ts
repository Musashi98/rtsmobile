import { useContext } from "react"
import SelfieViewerModalContext from "root/context/SelfieViewerModalContext"

export const useSelfieViewer = () => {
    const showSelfie = useContext(SelfieViewerModalContext.Context)

    return showSelfie
}