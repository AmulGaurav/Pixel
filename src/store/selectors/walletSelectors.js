import { selector } from "recoil";
import { currentIndexState, walletsState } from "../atoms/walletAtoms";
import { is24WordsState } from "../atoms/globalAtoms";

export const activeWalletSelector = selector({
  key: "activeWalletSelector",
  get: ({ get }) => {
    const wallets = get(walletsState);
    const currentIndex = get(currentIndexState);
    return wallets[currentIndex] || null;
  },
});

export const mnemonicLengthSelector = selector({
  key: "mnemonicLengthSelector",
  get: ({ get }) => {
    const is24Words = get(is24WordsState);
    return is24Words ? 24 : 12;
  },
});
