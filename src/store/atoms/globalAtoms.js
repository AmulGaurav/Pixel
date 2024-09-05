import { atom } from "recoil";

export const mnemonicState = atom({
  key: "mnemonicState",
  default: Array(12).fill(""),
});

export const isMnemonicEmptyState = atom({
  key: "isMnemonicEmptyState",
  default: true,
});

export const is24WordsState = atom({
  key: "is24WordsState",
  default: false,
});

export const isRecoveryPhraseSavedState = atom({
  key: "isRecoveryPhraseSavedState",
  default: false,
});

export const isCheckedState = atom({
  key: "isCheckedState",
  default: false,
});
