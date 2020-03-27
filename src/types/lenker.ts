export type LenkeData = {
  href: string;
  tekst: string;
};

export type LenkeSeksjonData = {
  tittel: string;
  lenker: LenkeData[];
};

export type Anchor = {
  hash: string;
  timestamp: number;
}
