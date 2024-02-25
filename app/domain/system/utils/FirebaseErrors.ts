
export type FirebaseError = {
    module: string;
    error: string;
}

export const extractFirebaseError = (errorMessage: string): FirebaseError => {
    const errorInfo = errorMessage.substring(errorMessage.indexOf("(") + 1, errorMessage.indexOf(")"))

    const splittedErrorInfo = errorInfo.split("/")

    return {
        module: splittedErrorInfo[0],
        error: splittedErrorInfo[1]
    }
}

export const traduceFirebaseError = (error: string) => {
    return error[0].toUpperCase() + error.substring(1).replace("-", " ")
}