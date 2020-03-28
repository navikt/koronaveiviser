import React, { Fragment } from "react";
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../../components/header-separator/HeaderSeparator";
import { SanityBlocks } from "../../../components/sanity-blocks/SanityBlocks";
import { Element } from "react-scroll";
import { EkspanderbartPanel } from "../../../components/ekspanderbart-panel/EkspanderbartPanel";
import { GACategory, triggerGaEvent } from "../../../utils/react-ga";
import { localeString } from "../../../utils/localeString";
import { useStore } from "../../../store/Provider";
import { Information } from "../../../utils/sanity/endpoints/contexts";

type Props = {
  praktiskInfo: Information;
};

const cssPrefix = "praktisk-info";

export const PraktiskInfoPanel = ({ praktiskInfo }: Props) => {
  const [{ anchor }] = useStore();

  return (
    <PanelBase
      className={`${cssPrefix}`}
    >
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          {praktiskInfo ? <SanityBlocks blocks={praktiskInfo.title} /> : "Praktisk informasjon"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {praktiskInfo &&
        praktiskInfo.sections.map((section, index) => {
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
