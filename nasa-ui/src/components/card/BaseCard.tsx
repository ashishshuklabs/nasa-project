import React, { ReactNode } from "react";
import styled from "styled-components";
interface Props {
  children: ReactNode
}
export const BaseCard = ({children}: Props) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 1px 2px 4px #222;
  border: 1px solid #222;
  border-radius: 4px;
  padding: 10px;
  max-width: 700px;
  max-height: 500px;
  height: 100%;
  margin: 10px auto;
`;