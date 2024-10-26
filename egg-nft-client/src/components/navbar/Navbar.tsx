import React from "react";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Account } from "types";
import { StyledHeader, StyledTitle } from "./Navbar.styles";

type NavbarProps = {
  account: Account;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
};

export const Navbar: React.FC<NavbarProps> = ({
  account,
  connectWallet,
  isConnected,
}) => {
  return (
    <StyledHeader>
      <Flex align="center" gap={20}>
        {isConnected ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" />
        )}
        {!account ? (
          <Button onClick={connectWallet}>Connect your Metamask Account</Button>
        ) : (
          <StyledTitle level={5}>
            {account.slice(0, 5) + "..." + account.slice(38, 42)}
          </StyledTitle>
        )}
      </Flex>
    </StyledHeader>
  );
};
