import React from 'react';
import { ToppSeksjon } from "./topp-seksjon/ToppSeksjon";
import { MidtSeksjon } from "./midt-seksjon/MidtSeksjon";
import { BunnSeksjon } from "./bunn-seksjon/BunnSeksjon";

export const Page = () => {
  return (
    <div className={"pagecontent"}>
      <ToppSeksjon />
      <MidtSeksjon />
      <BunnSeksjon />
    </div>
  );
};
