
export type FirebaseError = {
    module: string;
    error: string;
}

export const extractFirebaseError = (module: string, errorMessage: string): FirebaseError => {
    if (errorMessage.includes("(")) {
        const errorInfo = errorMessage.substring(errorMessage.indexOf("(") + 1, errorMessage.indexOf(")"))

        const splittedErrorInfo = errorInfo.split("/")

        return {
            module,
            error: splittedErrorInfo[1]
        }
    }

    return { module, error: errorMessage }
}

export const traduceFirebaseError = (error: string) => {
    return error[0].toUpperCase() + error.substring(1).replace("-", " ")
}