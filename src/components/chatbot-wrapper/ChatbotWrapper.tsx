import NavChatbot from "@navikt/nav-chatbot";
import React, { useEffect, useRef, useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { openChatbot, setCallbackOnChatbotOpen } from "./ChatbotUtils";

type Props = {
  customerKey: string;
  queueKey: string;
  configId: string;
  onOpen?: () => void;
};

const cssPrefix = "chatbot-wrapper";

const getElementTopPosition = (element: HTMLElement) => {
  return element.getBoundingClientRect().top + window.pageYOffset;
};

export const ChatbotWrapper = ({ customerKey, queueKey, configId, onOpen }: Props) => {
  const isOpenFromStorage = sessionStorage.getItem("chatbot-frida_apen");
  const [chatbotOpened, setChatbotOpened] = useState(isOpenFromStorage === "true");
  const chatbotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatbotOpened) {
      if (onOpen) {
        onOpen();
      }
    } else {
      setCallbackOnChatbotOpen(() => setChatbotOpened(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatbotOpened]);

  useEffect(() => {
    const preventFooterOverlap = () => {
      const chatbotElement = chatbotRef.current;
      const footerBottom =
        document.getElementsByClassName("menylinje-bottom")[0] as HTMLElement;
      if (!chatbotElement || !footerBottom) {
        return;
      }

      const scrollOffsetBottom = window.pageYOffset + window.innerHeight - chatbotElement.scrollHeight;
      const footerOffset = getElementTopPosition(footerBottom);
      if (scrollOffsetBottom > footerOffset) {
        const bottomOffset = document.body.offsetHeight - scrollOffsetBottom;
        chatbotElement.style.bottom = `${footerBottom.scrollHeight - bottomOffset}px`;
      } else {
        chatbotElement.removeAttribute("style");
      }
    };

    document.addEventListener("scroll", preventFooterOverlap);
    document.addEventListener("resize", preventFooterOverlap);
    return () => {
      document.removeEventListener("scroll", preventFooterOverlap);
      document.removeEventListener("resize", preventFooterOverlap);
    };
  }, []);

  return (
    <div
      className={cssPrefix}
      ref={chatbotRef}
    >
      <div
        className={`${cssPrefix}__innhold`}
        onClick={() => openChatbot(setChatbotOpened)}
      >
        <div className={`${cssPrefix}__visual ${chatbotOpened ? `${cssPrefix}__visual--open` : ""}`}>
          <Normaltekst className={`${cssPrefix}__text`}>
            {"Chatbot Frida"}
          </Normaltekst>
        </div>
        <NavChatbot
          customerKey={customerKey}
          queueKey={queueKey}
          configId={configId}
        />
      </div>
    </div>
  );
};
