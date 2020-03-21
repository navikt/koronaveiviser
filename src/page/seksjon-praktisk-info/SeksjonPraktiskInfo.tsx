import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { PraktiskInfo } from "../../utils/sanity/endpoints/information";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";

type Props = {
  praktiskInfo: PraktiskInfo;
};

const cssPrefix = "seksjon-praktisk-info";

export const SeksjonPraktiskInfo = ({ praktiskInfo }: Props) => {
  const info = praktiskInfo.info[0];

  if (!info) {
    return null;
  }

  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          <SanityBlocks blocks={info.title} />
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {info.sections.map((section, index) => (
          <div className={`${cssPrefix}__section`} key={index}>
            <Undertittel>
              <SanityBlocks blocks={section.title} />
            </Undertittel>
            <SanityBlocks blocks={section.description} />
          </div>
        ))}
      </div>
    </PanelBase>
  );
};
