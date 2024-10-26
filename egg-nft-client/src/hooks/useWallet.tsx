import { useState } from "react";
import { createWalletClient, custom, UserRejectedRequestError } from "viem";
import { sepolia } from "viem/chains";

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        });

        const [address] = await walletClient.requestAddresses();
        setAccount(address);
        setError(null);
      } catch (err) {
        const error = err as UserRejectedRequestError;

        setError(error.details || "Failed to connect to Metamask.");
      }
    } else {
      setError("Metamask is not installed.");
    }
  };

  return { account, connectWallet, error };
};
