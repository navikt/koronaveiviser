import React from 'react';
import { Rolle } from "../../types/roller";

type Props = {
  rolle: Rolle;
};

const cssPrefix = "lenke-filter";

export const LenkeFilter = ({ rolle }: Props) => {
  return (
    <div className={cssPrefix}>
      {rolle}
    </div>
  );
};

