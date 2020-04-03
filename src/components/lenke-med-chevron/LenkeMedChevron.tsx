import React from "react";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";
import { ExternalLinkIcon } from "../../assets/ExternalLinkIcon";

type Props = {
  href: string;
  children: JSX.Element;
  onClick?: (e: any) => void;
  className?: string;
  id?: string;
};

const cssPrefix = "chevronlenke";

const getHostname = (url: string) => url
  .replace(/https?:\/\//i, "")
  .replace(/www\./i, "")
  .split('/')[0];

const lenkeTekstMedChevron = (tekst: React.ReactNode, externalHostname?: string) => (
  <>
    <div><HoyreChevron className={`${cssPrefix}__chevron`} /></div>
    <div>
      {tekst}
      {externalHostname && (
        <span className={`${cssPrefix}__ekstern`}>
          <span className={`${cssPrefix}__ekstern-ikon`}><ExternalLinkIcon /></span>
          {`(${externalHostname})`}
        </span>
      )}
    </div>
  </>
);

const LenkeMedChevron = (props: Props) => {
  const { href, className, id, onClick, children } = props;
  const externalHostname = !href.includes("nav.no") ? getHostname(href) : undefined;
  const lenkeTekst = lenkeTekstMedChevron(children, externalHostname);

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
