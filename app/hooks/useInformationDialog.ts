import { useContext } from "react"
import InformationDialogModalContext from "root/context/InformationDialogModalContext"

const useInformationDialog = () => {
    const showInformationDialog = useContext(InformationDialogModalContext.Context)

    return showInformationDialog
}

export default useInformationDialog