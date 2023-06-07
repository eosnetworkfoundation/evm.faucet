import { AnyAction } from "@wharfkit/session"
import { ACCOUNT } from "./constants"
import { authorization } from "./config"

export const send = (to: string): AnyAction => {
    return {
        authorization,
        account: ACCOUNT,
        name: "send",
        data: {
            to,
        },
    }
}

export const nonce = (): AnyAction => {
    return {
        authorization,
        account: ACCOUNT,
        name: "nonce",
        data: {
            nonce: Math.floor(Math.random() * 1000000000),
        }
    }
}
