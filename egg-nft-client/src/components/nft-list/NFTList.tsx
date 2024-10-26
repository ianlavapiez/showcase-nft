import React from "react";
import { Account } from "types";
import { useNFT } from "hooks/useNFT";
import { StyledFlex } from "./NFTList.styles";
import { NFTListItem } from "../nft-list-item/NFTListItem";
import { Spinner } from "../spinner/Spinner";
import { Results } from "../results/Results";

type NFTListProps = {
  account: Account;
};

export const NFTList: React.FC<NFTListProps> = ({ account }) => {
  const { isNftsLoading, nfts } = useNFT({ account });

  return (
    <>
      {isNftsLoading ? (
        <Spinner />
      ) : (
        <>
          {nfts.length > 0 && !isNftsLoading ? (
            <StyledFlex align="center" justify="center" wrap gap={30}>
              {nfts.map((nft) => (
                <NFTListItem key={nft.tokenId} nft={nft} />
              ))}
            </StyledFlex>
          ) : (
            <Results account={account} />
          )}
        </>
      )}
    </>
  );
};
