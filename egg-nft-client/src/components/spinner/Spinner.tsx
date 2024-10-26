import React from "react";
import Spin, { SpinProps } from "antd/es/spin";
import { SpinnerContainer } from "./Spinner.styles";

export const Spinner: React.FC<SpinProps> = ({ ...spinnerProps }) => {
  return (
    <SpinnerContainer>
      <Spin size="large" {...spinnerProps} />
    </SpinnerContainer>
  );
};
