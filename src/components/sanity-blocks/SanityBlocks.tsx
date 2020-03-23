import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";

type Props = {
  blocks: any;
  serializer?: any;
};

export const SanityBlocks = ({ blocks, serializer = serializers }: Props) => (blocks
    ? <BlockContent blocks={blocks} serializers={serializer} />
    : null
);
