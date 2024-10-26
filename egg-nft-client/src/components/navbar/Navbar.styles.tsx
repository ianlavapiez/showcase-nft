import styled from "styled-components";
import Layout from "antd/es/layout";
import Title from "antd/es/typography/Title";

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
`;

export const StyledTitle = styled(Title)`
  margin: 0 !important;
`;
