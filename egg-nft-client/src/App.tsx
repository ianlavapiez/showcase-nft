import React from "react";
import { useWallet } from "hooks/useWallet";
import { useNft } from "hooks/useNft";

const App: React.FC = () => {
  const { connectWallet, account, error } = useWallet();
  const { error: nftError, isNftsLoading, nfts } = useNft({ account });

  return (
    <div>
      {!account ? (
        <div>
          <button onClick={connectWallet}>Connect Metamask</button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div>
          {isNftsLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p>{account}</p>
              <h1>Your NFTs</h1>
              <div>
                {nfts.length > 0 ? (
                  nfts.map((nft, index) => (
                    <div key={index}>
                      <img
                        src={nft.raw.metadata.image}
                        alt={nft.name || "NFT"}
                      />
                      <h3>{nft.name || "NFT"}</h3>
                      <p>{nft.description}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    {nftError ? nftError : "No NFTs found for this account."}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
