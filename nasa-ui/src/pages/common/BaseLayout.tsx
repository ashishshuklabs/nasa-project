import React, { ReactNode } from "react";
import styled from "styled-components";
import { Outlet } from "react-router";

type Props = {
  children?: ReactNode | ReactNode[];
};
export const BaseLayout = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

const Layout = styled.main`
  margin: 0 auto;
  padding: 0;
  margin: 0;
`;
