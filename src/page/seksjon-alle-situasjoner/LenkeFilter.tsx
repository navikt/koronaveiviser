import React from 'react';

type Props = {
  rolle: string;
};

const cssPrefix = "lenke-filter";

export const LenkeFilter = ({ rolle }: Props) => {
  return (
    <div className={cssPrefix}>
      {rolle}
    </div>
  );
};
