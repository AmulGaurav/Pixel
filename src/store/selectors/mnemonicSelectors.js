import { selector } from "recoil";
import { mnemonicState } from "../atoms/globalAtoms";

export const mnemonicStringSelector = selector({
  key: "mnemonicStringSelector",
  get: ({ get }) => {
    const mnemonic = get(mnemonicState);
    return mnemonic.join(" ");
  },
});
