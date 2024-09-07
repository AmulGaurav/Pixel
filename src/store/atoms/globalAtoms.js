import { atom } from "recoil";

export const mnemonicState = atom({
  key: "mnemonicState",
  default: Array(12).fill(""),
});

export const isMnemonicEmptyState = atom({
  key: "isMnemonicEmptyState",
  default: true,
});
