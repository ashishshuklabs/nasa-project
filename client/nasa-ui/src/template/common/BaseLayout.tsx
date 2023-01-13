import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode | ReactNode[];
};
export const BaseLayout = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.main`
  margin: 0 auto;
  padding: 0;
  margin: 0;
`;
