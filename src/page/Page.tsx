import React from 'react';
import { ToppSeksjon } from "./topp-seksjon/ToppSeksjon";
import { MidtSeksjon } from "./midt-seksjon/MidtSeksjon";
import { BunnSeksjon } from "./bunn-seksjon/BunnSeksjon";
import { BunnSeksjonInfo } from "./bunn-seksjon-info/BunnSeksjonInfo";

export const Page = () => {
  return (
    <div className={"pagecontent"}>
      <ToppSeksjon />
      <MidtSeksjon />
      <BunnSeksjon />
      <BunnSeksjonInfo />
    </div>
  );
};
