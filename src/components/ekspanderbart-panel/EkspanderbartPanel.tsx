import * as React from 'react';
import { EkspanderbartpanelBase } from "nav-frontend-ekspanderbartpanel";
import { useEffect, useState } from "react";
import { Undertittel } from 'nav-frontend-typografi';

type Props = {
  apen: boolean;
  tittel: string;
  className?: string;
  border?: boolean;
  toggleTime?: number;
  renderContentWhenClosed?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  children: JSX.Element;
};

export const EkspanderbartPanel = ({ apen, className, tittel, border, toggleTime, renderContentWhenClosed, onClick, children }: Props) => {
  const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    setIsOpen(apen);
  }, [toggleTime, apen]);

  return (
    <EkspanderbartpanelBase
      className={className}
      apen={isOpen}
      onClick={(event) => {
        setIsOpen(!isOpen);
        onClick && onClick(event);
      }}
      tittel={<Undertittel>{tittel}</Undertittel>}
      border={border}
      renderContentWhenClosed={renderContentWhenClosed}
    >
      {children}
    </EkspanderbartpanelBase>
  );
};
