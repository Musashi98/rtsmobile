import { ValidationResult } from "root/domain/system/types/Validations"

const nameRegex = /^[a-zA-Z0-9_-]*$/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/


export const isValidName = (name: string): ValidationResult => {
    if (!(name.match(nameRegex)))
        return {
            ok: false,
            motive: "Only letters, numbers and underscores valid"
        }

    if (!(name.length >= 4 && name.length <= 20))
        return {
            ok: false,
            motive: "Must be between 4 and 20 characters long"
        }

    return {
        ok: true
    }
}

export const isValidEmail = (email: string): ValidationResult => {
    if (!(email.match(emailRegex)))
        return {
            ok: false,
            motive: "Not a valid email"
        }

    return {
        ok: true
    }
}

export const isValidPassword = (password: string): ValidationResult => {
    if (!(password.match(passwordRegex)))
        return {
            ok: false,
            motive: "Only letters, numbers and special characters allowed"
        }

    if (!(password.length >= 6 && password.length <= 20))
        return {
            ok: false,
            motive: "Must be between 6 and 20 characters long"
        }

    return {
        ok: true
    }
}