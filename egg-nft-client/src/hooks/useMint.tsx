import { useEffect, useState } from "react";
import notification from "antd/es/notification";
import { TOKEN_URIS } from "consts";
import contractAbi from "contracts/EggNFT.json";
import { ethers } from "ethers";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  RpcError,
  type Address,
} from "viem";
import { sepolia } from "viem/chains";
import { fetchNFTs } from "services/alchemy";
import { Account } from "types";

const contractAddress = "0x530D62be07b0DdaF0dAde6FA26622978a12FC127";

type UseMintProps = {
  account: Account;
};

export const useMint = ({ account }: UseMintProps) => {
  const [api, contextHolder] = notification.useNotification();
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<{
    success?: string;
    error?: string;
  }>({});

  const getRandomTokenURI = () => {
    const randomIndex = Math.floor(Math.random() * TOKEN_URIS.length);
    return TOKEN_URIS[randomIndex];
  };

  const mintNFT = async () => {
    if (!account) {
      api.error({
        message: "Mint Error!",
        description: "Please connect your Metamask wallet first.",
      });

      return;
    }

    try {
      if (window.ethereum) {
        setIsMinting(true);

        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(),
        });
        const tokenUri = `https://gateway.pinata.cloud/ipfs/${getRandomTokenURI()}`;
        const { request } = await publicClient.simulateContract({
          account: account as Address,
          address: contractAddress as Address,
          abi: contractAbi.abi,
          functionName: "mintNFT",
          args: [account, tokenUri],
        });

        const response = await walletClient.writeContract(request);

        const provider = new ethers.BrowserProvider(window.ethereum);

        await provider.waitForTransaction(response);

        const link = `https://sepolia.etherscan.io/tx/${response}`;

        await fetchNFTs(account);

        setMintStatus({
          success: link,
          error: undefined,
        });

        setIsMinting(false);
      }
    } catch (err) {
      setIsMinting(false);
      const mintError = err as RpcError;
      const error =
        mintError.shortMessage ||
        "An error occurred while executing mint, please try again.";

      setMintStatus({ success: undefined, error });
    }
  };

  useEffect(() => {
    if (mintStatus.success) {
      api.success({
        message: "Mint Success!",
        description: (
          <a
            href={mintStatus.success}
            rel="noreferrer noopener"
            target="_blank"
          >
            NFT minted! Check it out at: ${mintStatus.success}
          </a>
        ),
      });
      return;
    }

    if (mintStatus.error) {
      api.error({
        message: "Mint Error!",
        description: mintStatus.error,
      });
    }
  }, [api, mintStatus]);

  return { contextHolder, isMinting, mintNFT };
};
