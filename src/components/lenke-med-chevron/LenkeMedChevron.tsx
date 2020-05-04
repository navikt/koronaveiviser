import React from "react";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";
import { isExternalUrl, textWithExternalIcon } from "../../utils/url-utils";

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: (e: any) => void;
  className?: string;
  id?: string;
};

const cssPrefix = "chevronlenke";

const lenkeTekstMedChevron = (tekst: React.ReactNode, href: string) => (
  <>
    <div><HoyreChevron className={`${cssPrefix}__chevron`} /></div>
    <div>
      {isExternalUrl(href) ? textWithExternalIcon(tekst) : tekst}
    </div>
  </>
);

const LenkeMedChevron = (props: Props) => {
  const { href, className, id, onClick, children } = props;
  const lenkeTekst = lenkeTekstMedChevron(children, href);

  return (
    <Lenke
      href={href}
      className={`${cssPrefix}${className ? ` ${className}` : ''}`}
      onClick={onClick}
      id={id}
    >
      {lenkeTekst}
    </Lenke>
  );
};

export default LenkeMedChevron;
