import React from "react";
import { Account } from "types";
import { useNFT } from "hooks/useNFT";
import { StyledFlex } from "./NFTList.styles";
import { NFTListItem } from "../nft-list-item/NFTListItem";
import { Spinner } from "../spinner/Spinner";
import { Results } from "../results/Results";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useMint } from "hooks/useMint";

type NFTListProps = {
  account: Account;
};

export const NFTList: React.FC<NFTListProps> = ({ account }) => {
  const { isMinting, mintNFT } = useMint({ account });
  const { isNftsLoading, nfts } = useNFT({ account });

  return (
    <>
      {isNftsLoading ? (
        <Spinner />
      ) : (
        <>
          {nfts.length > 0 && !isNftsLoading ? (
            <Flex vertical>
              <Flex vertical align="center" justify="center">
                <Title>EGG NFT List</Title>
                <Button loading={isMinting} onClick={mintNFT}>
                  Mint EGG NFT
                </Button>
              </Flex>
              <StyledFlex align="center" justify="center" wrap gap={30}>
                {nfts.map((nft) => (
                  <NFTListItem key={nft.tokenId} nft={nft} />
                ))}
              </StyledFlex>
            </Flex>
          ) : (
            <Results account={account} />
          )}
        </>
      )}
    </>
  );
};
