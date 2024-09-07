import { atom } from "recoil";

export const showMnemonicState = atom({
  key: "showMnemonicState",
  default: false,
});

export const showToastState = atom({
  key: "showToastState",
  default: false,
});

export const showPrivateKeyState = atom({
  key: "showPrivateKeyState",
  default: false,
});

export const selectedBlockChainState = atom({
  key: "selectedBlockChainState",
  default: null,
});
