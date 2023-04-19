import { atom } from "recoil";
import { CHAIN_DEFAULT } from "./api/constants";

export const chainState = atom({
    key: 'chain',
    default: CHAIN_DEFAULT,
});