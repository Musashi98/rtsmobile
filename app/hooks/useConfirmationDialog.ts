import { useContext } from "react"
import ConfirmationDialogModalContext from "root/context/ConfirmationDialogModalContext"

const useConfirmationDialog = () => {
    const showConfirmationDialog = useContext(ConfirmationDialogModalContext.Context)

    return showConfirmationDialog
}

export default useConfirmationDialog