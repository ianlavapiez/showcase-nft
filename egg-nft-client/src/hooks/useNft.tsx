import { useEffect, useState } from "react";
import { OwnedNft } from "alchemy-sdk";
import { fetchNFTs } from "services/alchemy";

type UseNftProps = {
  account: string | null;
};

export const useNft = ({ account }: UseNftProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isNftsLoading, setIsNftsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<OwnedNft[]>([]);

  useEffect(() => {
    if (account) {
      setIsNftsLoading(false);
      fetchNFTs(account)
        .then(setNfts)
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsNftsLoading(false);
        });
    }
  }, [account]);

  return { error, isNftsLoading, nfts };
};
