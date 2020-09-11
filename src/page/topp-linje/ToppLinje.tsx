import React, { useEffect } from "react";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler/dist";

type Props = {
  tittel: string;
};

export const ToppLinje = ({ tittel }: Props) => {
  // Set breadcrumbs in decortor
  useEffect(() => {
    setBreadcrumbs([
      {
        title: tittel,
        url: "https://www.nav.no/person/koronaveiviser/"
      }
    ]);
  }, [tittel]);

  return <></>;
};
