import { ValidationResult } from "root/domain/system/types/Validations"

const codeRegex = /^[A-Z0-9]*$/

export const isValidEventCode = (code: string): ValidationResult => {
    if (!(code.match(codeRegex)))
        return {
            ok: false,
            motive: "Only uppercase letters and numbers allowed"
        }

    if (code.length !== 8)
        return {
            ok: false,
            motive: "Code must have 8 characters"
        }

    return {
        ok: true
    }
}