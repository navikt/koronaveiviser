import React from "react";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";
import eksternIkon from "../../assets/arrow-right.svg";

type Props = {
  href: string;
  children: JSX.Element;
  onClick?: (e: any) => void;
  className?: string;
  id?: string;
};

const lenkeTekstMedChevron = (tekst: React.ReactNode, isExternal = false) => (
  <>
    <div><HoyreChevron className={"chevronlenke__chevron"} /></div>
    <div className={"chevronlenke__tekst"}>
      {tekst}
      {isExternal && <img src={eksternIkon} alt={""} className={"chevronlenke__ekstern-ikon"} />}
    </div>
  </>
);

const LenkeMedChevron = (props: Props) => {
  const { href, className, id, onClick, children } = props;
  const isExternal = !href.includes("nav.no");
  const lenkeTekst = lenkeTekstMedChevron(children, isExternal);

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
