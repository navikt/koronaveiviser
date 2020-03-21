import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import React from "react";
import { Undertekst } from "nav-frontend-typografi";
import moment from "moment";

type Props = {
  type: AlertStripeType;
  lastUpdate: string;
  children: JSX.Element;
};

export const Varsel = ({ type, lastUpdate, children }: Props) => (
  <AlertStripe className={"varsel-panel"} type={type}>
    <div>{children}</div>
    <div className={"varsel-panel__last-update"}>
      <Undertekst>{`Sist oppdatert: ${moment(lastUpdate).format("DD-MM-YYYY [kl.] HH:mm")}`}</Undertekst>
    </div>
  </AlertStripe>
);
