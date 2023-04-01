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
            nonce: Math.floor(Math.random() * 1000000000),
        },
    }
}
