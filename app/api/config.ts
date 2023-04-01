if ( !process.env.PRIVATE_KEY ) throw new Error("PRIVATE_KEY is not defined");
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const NODE_URL_TESTNET = "https://jungle4.api.eosnation.io";
