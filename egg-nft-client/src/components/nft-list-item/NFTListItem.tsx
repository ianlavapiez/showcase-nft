import React from "react";
import { OwnedNft } from "alchemy-sdk";
import Card from "antd/es/card";
import { StyledCard } from "./NFTListItem.styles";

const { Meta } = Card;

type NFTListItemProps = {
  nft: OwnedNft;
};

export const NFTListItem: React.FC<NFTListItemProps> = ({ nft }) => (
  <StyledCard
    hoverable
    cover={<img alt={nft.name} src={nft.raw.metadata.image} />}
  >
    <Meta title={nft.name} description={nft.description} />
  </StyledCard>
);
