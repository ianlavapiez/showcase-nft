import React from "react";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Result from "antd/es/result";
import { MehTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Account } from "types";
import { StyledFlex } from "./Results.styles";
import { useMint } from "hooks/useMint";

type ResultsProps = {
  account: Account;
};

export const Results: React.FC<ResultsProps> = ({ account }) => {
  const { contextHolder, isMinting, mintNFT } = useMint({ account });

  const openSepoliaFaucet = () => {
    window.open(
      "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
      "_blank"
    );
  };

  if (!account) {
    return (
      <StyledFlex>
        <Result
          icon={<SmileTwoTone />}
          subTitle="Please login your account to view your NFT list."
        />
      </StyledFlex>
    );
  }

  return (
    <StyledFlex>
      {contextHolder}
      <Result
        icon={<MehTwoTone twoToneColor="#eb2f96" />}
        subTitle="Sorry, you don't have any NFTs on this account. If you want to mint one, kindly check our Egg Mint Documentation on how to mint your EGG NFTs."
        extra={
          <Flex gap={20} justify="center">
            <Button loading={isMinting} onClick={mintNFT} type="primary">
              Mint your own EGG NFT
            </Button>
            <Button onClick={openSepoliaFaucet} type="link">
              Get Sepolia ETH Tokens
            </Button>
          </Flex>
        }
      />
    </StyledFlex>
  );
};
