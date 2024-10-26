import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: import.meta.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export const fetchNFTs = async (ownerAddress: string) => {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(ownerAddress);
    return nfts.ownedNfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
};
