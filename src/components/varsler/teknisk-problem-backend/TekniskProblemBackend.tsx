import AlertStripe from "nav-frontend-alertstriper";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";

export const TekniskProblemBackend = () => (
  <AlertStripe type={"feil"} className={"varsel-panel"}>
    <Normaltekst>
      {"Vi har tekniske problemer!"}
    </Normaltekst>
  </AlertStripe>
);
