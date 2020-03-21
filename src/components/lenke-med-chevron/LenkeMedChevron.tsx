import React from "react";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";

type Props = {
  href: string;
  children: JSX.Element;
  onClick?: () => void;
  className?: string;
  id?: string;
};

const lenkeTekstMedChevron = (tekst: React.ReactNode) => (
  <span>
    <HoyreChevron className={"chevronlenke__chevron"} />
    {tekst}
  </span>
);

const RouterLenkeMedChevron = (props: Props) => {
  const { href, className, id, onClick, children } = props;
  const lenkeTekst = lenkeTekstMedChevron(children);

  return (
    <Lenke
      href={href}
      className={`chevronlenke ${className}`}
      onClick={onClick}
      id={id}
    >
      {lenkeTekst}
    </Lenke>
  );
};

export default RouterLenkeMedChevron;
