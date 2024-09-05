import { atom } from "recoil";

export const walletsState = atom({
  key: "walletsState",
  default: [],
});

export const selectedWalletState = atom({
  key: "selectedWalletState",
  default: null,
});

export const currentIndexState = atom({
  key: "currentIndexState",
  default: 0,
});

export const walletBalanceState = atom({
  key: "walletBalanceState",
  default: null,
});

export const isBalanceLoadingState = atom({
  key: "isBalanceLoadingState",
  default: true,
});
