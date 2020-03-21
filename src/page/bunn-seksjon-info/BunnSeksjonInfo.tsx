import React from 'react';
import PanelBase from "nav-frontend-paneler";
import { Normaltekst, Systemtittel, Undertittel } from "nav-frontend-typografi";
import { HeaderSeparator } from "../../components/header-separator/HeaderSeparator";

const cssPrefix = "bunn-seksjon-info";

export const BunnSeksjonInfo = () => {
  return (
    <PanelBase className={cssPrefix}>
      <div className={`${cssPrefix}__header`}>
        <Systemtittel>
          Praktisk informasjon
        </Systemtittel>
      </div>
      <HeaderSeparator />
      <div className={`${cssPrefix}__innhold`}>
        <Undertittel>
          Hvordan kommer du i kontakt med NAV nå?
        </Undertittel>
        <Normaltekst>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed eleifend ex. Quisque tempor magna fermentum
          dignissim convallis. Ut malesuada lorem massa, id pharetra mi maximus sit amet. In massa odio, tristique
          facilisis feugiat nec, commodo et metus. Proin porta, mauris ac pellentesque interdum, neque massa blandit
          justo, ac ultrices nisl elit vel orci. Phasellus eu placerat quam, auctor fermentum odio. Cras bibendum risus
          id tempor feugiat. Ut accumsan tincidunt urna vel elementum.
        </Normaltekst>
        <Undertittel>
          Endre kontonummer
        </Undertittel>
        <Normaltekst>
          Proin a tortor vitae metus consequat elementum quis nec massa. Sed lacinia, erat eget fermentum pulvinar, erat
          nulla commodo diam, et finibus velit augue at purus. Vivamus a porttitor enim. Maecenas eu purus sodales,
          accumsan lorem sed, facilisis massa. Aenean ac metus et est faucibus mollis. Curabitur vitae orci eget neque
          aliquet consequat. Ut finibus hendrerit nulla vitae mattis. Mauris at ornare odio. Praesent volutpat, neque
          sed convallis auctor, leo quam vulputate justo, et vulputate orci est nec urna. Aliquam laoreet metus nec
          bibendum tincidunt. Morbi sed interdum sem. Etiam mattis auctor congue. Vestibulum imperdiet ipsum interdum
          aliquet ullamcorper. Proin pulvinar nec odio nec pulvinar. Duis sed metus nisl. Donec auctor arcu at sem
          ultricies consectetur.
        </Normaltekst>
      </div>
    </PanelBase>
  );
};
