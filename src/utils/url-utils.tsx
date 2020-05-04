import React from "react";
import { ExternalLinkIcon } from "../assets/ExternalLinkIcon";

export const isExternalUrl = (url: string) => !getHostname(url).includes("nav.no");

export const getHostname = (url: string) => url
  .replace(/https?:\/\//i, "")
  .replace(/www\./i, "")
  .split('/')[0];

export const textWithExternalIcon = (text: string | React.ReactNode) => {
  if (typeof text !== "string") {
    return (
      <span>
        {text}
        <ExternalLinkIcon />
      </span>
    );
  }

  const words = text.split(" ");
  const lastWord = words.pop();
  return (
    <>
      {`${words.join(" ")} `}
      <span className={"nowrap"}>
        {lastWord}
        <ExternalLinkIcon />
      </span>
    </>
  );
};
