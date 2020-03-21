import React from "react";
import { SanityBlocks } from "../sanity-blocks/SanityBlocks";
import { TekniskProblemBackend } from "./teknisk-problem-backend/TekniskProblemBackend";
import { useStore } from "../../store/Provider";

export const VarselVisning = () => {
  const [{ alerts, visTekniskFeilMelding }] = useStore();
  const varsler = alerts.alerts;

  return (
    <div className={`${alerts.isLoaded ? " varsler-container--loaded" : "varsler-container--loading"}`}>
      {visTekniskFeilMelding && <TekniskProblemBackend />}
      {varsler.map((varsel, index) => <SanityBlocks blocks={varsel} key={index} />)}
    </div>
  );
};
