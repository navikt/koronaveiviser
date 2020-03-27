import React, { Fragment } from "react";
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { PraktiskInfo } from "../../utils/sanity/endpoints/information";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { Element } from "react-scroll";
import { seksjonIds } from "../Page";
import { EkspanderbartPanel } from "../../components/ekspanderbart-panel/EkspanderbartPanel";
import { GACategory, triggerGaEvent } from "../../utils/react-ga";
import { localeString } from "../../utils/localeString";
import { useStore } from "../../store/Provider";

type Props = {
  praktiskInfo: PraktiskInfo;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-praktisk-info";

export const SeksjonPraktiskInfo = ({ praktiskInfo, isLoaded }: Props) => {
  const info = praktiskInfo.info[0];
  const [{ anchor }] = useStore();

  return (
    <PanelBase
      className={`${cssPrefix} seksjon-panel${
        isLoaded ? ` seksjon-panel--loaded` : ""
      }`}
    >
      <div className={`${cssPrefix}__header`} id={seksjonIds[3]}>
        <Systemtittel>
          {info ? <SanityBlocks blocks={info.title} /> : "Praktisk informasjon"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {info &&
        info.sections.map((section, index) => {
          const sectionAnchor = section.anchor && section.anchor.current;
          const anchorName = sectionAnchor || `section-${index}`;
          const shouldOpen = anchor.hash === sectionAnchor;
          return (
            <Fragment key={index}>
              <Element name={anchorName} />
              <EkspanderbartPanel
                renderContentWhenClosed={true}
                apen={shouldOpen}
                className={`${cssPrefix}__section`}
                tittel={<SanityBlocks blocks={section.title} key={index} />}
                onClick={() => triggerGaEvent(
                  GACategory.PraktiskInfo,
                  `ekspander/${localeString(section.title)}`
                )}
                toggleTime={shouldOpen ? anchor.timestamp : undefined}
              >
                <div className={`${cssPrefix}__panel-innhold`}>
                  <SanityBlocks blocks={section.description} />
                </div>
              </EkspanderbartPanel>
            </Fragment>
          );
        })}
      </div>
    </PanelBase>
  );
};
