import { useEffect, useState } from "react";
import notification from "antd/es/notification";
import { createWalletClient, custom, UserRejectedRequestError } from "viem";
import { sepolia } from "viem/chains";

export const useWallet = () => {
  const [api, contextHolder] = notification.useNotification();
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        });

        const [address] = await walletClient.requestAddresses();
        const chainId = await walletClient.getChainId();

        if (chainId !== sepolia.id) {
          api.error({
            message: "Connection Error!",
            description: "Please connect to the Sepolia ETH network.",
          });

          return;
        }

        setAccount(address);
        setIsConnected(true);
        api.success({
          message: "Connection Success!",
          description: "Successfully connected your Metamask account.",
        });
      } catch (err) {
        const userError = err as UserRejectedRequestError;
        const error = userError.details || "Failed to connect to Metamask.";

        setIsConnected(false);
        api.error({ message: "Connection Error!", description: error });
      }
    } else {
      setIsConnected(false);
      api.error({
        message: "Connection Error!",
        description: "Metamask is not installed.",
      });
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      setIsConnected(false);
      api.info({
        message: "Disconnected!",
        description: "No accounts connected.",
      });
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
      api.info({
        message: "Account Switched!",
        description: "Your Metamask account has been switched.",
      });
    }
  };

  const handleChainChanged = (chainId: string) => {
    if (parseInt(chainId, 16) !== sepolia.id) {
      api.error({
        message: "Network Error!",
        description: "Please switch to the Sepolia ETH network.",
      });
      setIsConnected(false);
    } else {
      setIsConnected(true);
      api.success({
        message: "Network Switched!",
        description: "Connected to the Sepolia ETH network.",
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethereum = window.ethereum;

      // Request permissions and add listener for account changes
      ethereum.request({ method: "eth_requestAccounts" }).then(connectWallet);
      ethereum.on(
        "accountsChanged",
        handleAccountsChanged as (...args: unknown[]) => void
      );
      ethereum.on(
        "chainChanged",
        handleChainChanged as (...args: unknown[]) => void
      );

      // Clean up event listeners on unmount
      return () => {
        ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged as (...args: unknown[]) => void
        );
        ethereum.removeListener(
          "chainChanged",
          handleChainChanged as (...args: unknown[]) => void
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { account, connectWallet, contextHolder, isConnected };
};
