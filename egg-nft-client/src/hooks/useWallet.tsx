import { useState } from "react";
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
        setAccount(address);
        setIsConnected(true);
        api.success({
          message: "Connection Success!",
          description: "Successfully connected your metamask account.",
        });
      } catch (err) {
        const userError = err as UserRejectedRequestError;
        setIsConnected(false);
        const error = userError.details || "Failed to connect to Metamask.";
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

  return { account, connectWallet, contextHolder, isConnected };
};
