import React, { useEffect, useState } from "react";
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { PraktiskInfo } from "../../utils/sanity/endpoints/information";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { configureAnchors } from "react-scrollable-anchor";
import { EkspanderbartPanel } from "../../components/ekspanderbart-panel/EkspanderbartPanel";

type Props = {
  praktiskInfo: PraktiskInfo;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-praktisk-info";

configureAnchors({
  keepLastAnchorHash: false
});

export const SeksjonPraktiskInfo = ({ praktiskInfo, isLoaded }: Props) => {
  const info = praktiskInfo.info[0];
  const [currentHash, setCurrentHash] = useState<{ hash: string, timestamp: number }>();
  console.log(currentHash);

  useEffect(() => {
    const hashChangeHandler = (event: HashChangeEvent) => {
      const newHash = event.newURL.split("#")[1];
      setCurrentHash({ hash: newHash, timestamp: Date.now() });
      window.scrollTo()
    };
    window.addEventListener("hashchange", hashChangeHandler);
    return () => window.removeEventListener("hashchange", hashChangeHandler);
  }, []);

  return (
    <PanelBase
      className={`${cssPrefix} seksjon-panel${
        isLoaded ? ` seksjon-panel--loaded` : ""
      }`}
    >
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          {info ? <SanityBlocks blocks={info.title} /> : "Praktisk informasjon"}
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        {info &&
        info.sections.map((section, index) => {
          const sectionAnchor = section.anchor && section.anchor.current;
          const shouldOpen = sectionAnchor === currentHash?.hash;
          return (
              <div id={sectionAnchor}>
                <EkspanderbartPanel
                  apen={shouldOpen}
                  className={`${cssPrefix}__section`}
                  tittel={<SanityBlocks blocks={section.title} key={index} />}
                  toggleTime={shouldOpen ? currentHash?.timestamp : undefined}
                >
                  <div className={`${cssPrefix}__panel-innhold`}>
                    <SanityBlocks blocks={section.description} />
                  </div>
                </EkspanderbartPanel>
              </div>
          );
        })}
      </div>
    </PanelBase>
  );
};
