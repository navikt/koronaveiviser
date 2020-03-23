import { GACategory, triggerGaEvent } from "./react-ga";

const getButtonFromClassname = (className: string, index = 0) => {
  const buttons = document.getElementsByClassName(className);
  const button = (buttons && buttons.length > index) && (buttons[index] as HTMLElement);

  return button;
};

export const hookChatbotOpenWithGaEvent = () => {
  const button = getButtonFromClassname("sc-eqIVtm");
  if (!button) {
    return;
  }

  button.addEventListener("click", () => triggerGaEvent(GACategory.Andre, "open-chatbot"));
};
