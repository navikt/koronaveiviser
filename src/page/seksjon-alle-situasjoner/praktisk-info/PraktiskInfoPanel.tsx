import React, { Fragment } from "react";
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../../components/header-separator/HeaderSeparator";
import { SanityBlocks } from "../../../components/sanity-blocks/SanityBlocks";
import { Element } from "react-scroll";
import { EkspanderbartPanel } from "../../../components/ekspanderbart-panel/EkspanderbartPanel";
import { AnalyticsCategory, triggerAnalyticsEvent } from "../../../utils/amplitude";
import { localeString } from "../../../utils/sanity/localeString";
import { useStore } from "../../../store/Provider";
import { Information } from "../../../utils/sanity/endpoints/information";
import { LocaleString } from "../../../utils/sanity/common-types";

type Props = {
  praktiskInfo: Information[];
  tittel?: LocaleString;
};

const cssPrefix = "praktisk-info";

export const PraktiskInfoPanel = ({ praktiskInfo, tittel }: Props) => {
  const [{ anchor }] = useStore();

  return (
    <PanelBase
      className={`${cssPrefix}`}
    >
      {tittel && (
        <div className={`${cssPrefix}__header`}>
          <Systemtittel>
            <SanityBlocks blocks={tittel} />
          </Systemtittel>
        </div>)}
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {praktiskInfo &&
        praktiskInfo.map((seksjon, index) => {
          const anchorName = seksjon.anchor || `section-${index}`;
          const shouldOpen = seksjon.anchor === anchor.hash;
          const title = localeString(seksjon.title);
          return (
            <Fragment key={index}>
              <Element name={anchorName} />
              <EkspanderbartPanel
                renderContentWhenClosed={true}
                apen={shouldOpen}
                className={`${cssPrefix}__section`}
                tittel={title}
                onClick={() => triggerAnalyticsEvent(
                  AnalyticsCategory.PraktiskInfo,
                  `ekspander/${title}`
                )}
                toggleTime={shouldOpen ? anchor.timestamp : undefined}
              >
                <div className={`${cssPrefix}__panel-innhold`}>
                  <SanityBlocks blocks={seksjon.description} />
                </div>
              </EkspanderbartPanel>
            </Fragment>
          );
        })}
      </div>
    </PanelBase>
  );
};
