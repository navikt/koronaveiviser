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

const getHostname = (url: string) => url
  .replace(/https?:\/\//i, "")
  .replace(/www\./i, "")
  .split('/')[0];


const lenkeTekstMedChevron = (tekst: React.ReactNode, externalHostname?: string) => (
  <>
    <div><HoyreChevron className={"chevronlenke__chevron"} /></div>
    <div>
      {tekst}
      {externalHostname && (
        <>
          <span className={"chevronlenke__ekstern-ikon"}><ExternalLinkIcon /></span>
          {`[${externalHostname}]`}
        </>
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
      className={`chevronlenke${className ? ` ${className}` : ''}`}
      onClick={onClick}
      id={id}
    >
      {lenkeTekst}
    </Lenke>
  );
};

export default LenkeMedChevron;
