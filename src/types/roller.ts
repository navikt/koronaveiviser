export enum Rolle {
  Privatperson,
  SelvstendigNd,
  Arbeidsgiver,
  Samarbeidspartner
}

export type RolleData = {
  rolle: Rolle;
  navn: string;
};

export const rolleData: RolleData[] = [
  {
    rolle: Rolle.Privatperson,
    navn: "Privatperson"
  },
  {
    rolle: Rolle.SelvstendigNd,
    navn: "Selvstendig næringsdrivende"
  },
  {
    rolle: Rolle.Arbeidsgiver,
    navn: "Arbeidsgiver"
  },
  {
    rolle: Rolle.Samarbeidspartner,
    navn: "Samarbeidspartner"
  }
];
