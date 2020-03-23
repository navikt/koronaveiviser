import { Language } from "../types/language";

const language = Language.Bokmaal;

export const localeString = (text: { [key in Language]: string }) => {
  return (text && text[language]) || "";
};
