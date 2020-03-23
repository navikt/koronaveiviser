import * as React from 'react';
import { EkspanderbartpanelBase } from "nav-frontend-ekspanderbartpanel";
import { useEffect, useState } from "react";

type Props = {
  apen: boolean;
  tittel: JSX.Element;
  className?: string;
  border?: boolean;
  toggleTime?: number;
  children: JSX.Element;
};

export const EkspanderbartPanel = ({ apen, className, tittel, border, toggleTime, children }: Props) => {
  const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    setIsOpen(apen);
  }, [toggleTime]);

  return (
    <EkspanderbartpanelBase
      className={className}
      apen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      tittel={tittel}
      border={border}
    >
      {children}
    </EkspanderbartpanelBase>
  );
};
