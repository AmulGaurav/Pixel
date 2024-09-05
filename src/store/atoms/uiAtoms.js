import { atom } from "recoil";

export const isLandingPageState = atom({
  key: "isLandingPageState",
  default: true,
});

export const showImportWalletState = atom({
  key: "showImportWalletState",
  default: false,
});

export const isImportedWalletState = atom({
  key: "isImportedWalletState",
  default: false,
});

export const showMnemonicState = atom({
  key: "showMnemonicState",
  default: true,
});

export const showSupportedChainsState = atom({
  key: "showSupportedChainsState",
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
