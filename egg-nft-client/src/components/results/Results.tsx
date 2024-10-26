import React from "react";
import Button from "antd/es/button";
import Result from "antd/es/result";
import { MehTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Account } from "types";
import { StyledFlex } from "./Results.styles";

type ResultsProps = {
  account: Account;
};

export const Results: React.FC<ResultsProps> = ({ account }) => {
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
      <Result
        icon={<MehTwoTone twoToneColor="#eb2f96" />}
        subTitle="Sorry, you don't have any NFTs on this account. If you want to mint one, kindly check our Egg Mint Documentation on how to mint your EGG NFTs."
        extra={<Button type="primary">Egg Mint Documentation</Button>}
      />
    </StyledFlex>
  );
};
