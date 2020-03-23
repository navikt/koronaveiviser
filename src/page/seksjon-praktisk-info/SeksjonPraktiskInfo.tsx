import React, { useState, Fragment, useEffect } from "react";
import PanelBase from "nav-frontend-paneler";
import { Systemtittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";
import { PraktiskInfo } from "../../utils/sanity/endpoints/information";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Element, scroller } from "react-scroll";
import { seksjonIds } from "../Page";

type Props = {
  praktiskInfo: PraktiskInfo;
  isLoaded: boolean;
};

const cssPrefix = "seksjon-praktisk-info";

const getHash = () => {
  const parts = window.location.href.split("#");
  return parts.length > 1 ? parts[1] : ``;
};

const scrollToAnchor = (id: string) => {
  scroller.scrollTo(id, {
    smooth: true
  });
};

export const SeksjonPraktiskInfo = ({ praktiskInfo, isLoaded }: Props) => {
  const info = praktiskInfo.info[0];
  const [anchor, setAnchor] = useState(getHash());
  // const [currentHash, setCurrentHash] = useState<{ hash: string, timestamp: number }>();
  // console.log(currentHash);


  useEffect(() => {
    if (isLoaded) {
      scrollToAnchor(anchor);
    }
  }, [isLoaded, anchor]);

  window.onhashchange = () => {
    setAnchor(getHash());
  };

  // useEffect(() => {
  //   const hashChangeHandler = (event: HashChangeEvent) => {
  //     const newHash = event.newURL.split("#")[1];
  //     setCurrentHash({ hash: newHash, timestamp: Date.now() });
  //     window.scrollTo()
  //   };
  //   window.addEventListener("hashchange", hashChangeHandler);
  //   return () => window.removeEventListener("hashchange", hashChangeHandler);
  // }, []);


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
            return (
              <Fragment key={Math.random()}>
                <Element name={anchorName}></Element>
                <Ekspanderbartpanel
                  renderContentWhenClosed={true}
                  apen={anchor === sectionAnchor}
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
