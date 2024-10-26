import React, { Fragment } from "react";
import { Navbar, NFTList } from "components";
import { useWallet } from "hooks/useWallet";

const Home: React.FC = () => {
  const { account, connectWallet, contextHolder, isConnected } = useWallet();

  return (
    <Fragment>
      {contextHolder}
      <Navbar
        account={account}
        connectWallet={connectWallet}
        isConnected={isConnected}
      />
      <NFTList account={account} />
    </Fragment>
  );
};

export default Home;
