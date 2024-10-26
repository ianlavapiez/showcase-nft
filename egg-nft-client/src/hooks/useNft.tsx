import { useEffect, useState } from "react";
import { OwnedNft } from "alchemy-sdk";
import { fetchNFTs } from "services/alchemy";

type UseNFTProps = {
  account: string | null;
};

export const useNFT = ({ account }: UseNFTProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isNftsLoading, setIsNftsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<OwnedNft[]>([]);

  useEffect(() => {
    if (account) {
      setIsNftsLoading(true);
      fetchNFTs(account)
        .then(setNfts)
        .catch((err) => {
          setError(err);
          setIsNftsLoading(false);
        })
        .finally(() => {
          setIsNftsLoading(false);
        });
    }
  }, [account]);

  return { error, isNftsLoading, nfts };
};
