import { toJSON } from "../utils";

export function GET(request: Request ) {
    return toJSON([
        {address: "0xed33259a056f4fb449ffb7b7e2ecb43a9b5685bf", timestamp: new Date().getTime() - 10000},
        {address: "0xebec795c9c8bbd61ffc14a6662944748f299cacf", timestamp: new Date().getTime() - 30000},
        {address: "0x9b1f7f645351af3631a656421ed2e40f2802e6c0", timestamp: new Date().getTime() - 60000},
        {address: "0x388c818ca8b9251b393131c08a736a67ccb19297", timestamp: new Date().getTime() - 100000},
    ]);
}
