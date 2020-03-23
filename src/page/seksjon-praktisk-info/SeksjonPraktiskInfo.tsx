import React, { useEffect, Fragment, useState } from "react";
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { PraktiskInfo } from "../../utils/sanity/endpoints/information";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";

type Props = {
  praktiskInfo: PraktiskInfo;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-praktisk-info";

const getHash = () => {
  const parts = window.location.href.split("#");
  if (parts.length > 1) {
    return parts[1];
  } else {
    return undefined;
  }
};

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
            const anchorName = sectionAnchor || `section-${index}`;
            return (
              <Fragment key={Math.random()}>
                <a href={"/"} id={anchorName} className={`${cssPrefix}__anker`}>
                  {`Anker ${anchorName}`}
                </a>
                <Ekspanderbartpanel
                  renderContentWhenClosed={true}
                  apen={anchorName === sectionAnchor}
                  className={`${cssPrefix}__section`}
                  tittel={<SanityBlocks blocks={section.title} key={index} />}
                >
                  <div className={`${cssPrefix}__panel-innhold`}>
                    <SanityBlocks blocks={section.description} />
                  </div>
                </Ekspanderbartpanel>
              </Fragment>
            );
          })}
      </div>
    </PanelBase>
  );
};
