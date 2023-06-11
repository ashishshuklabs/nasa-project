import React, { ReactNode, FunctionComponent } from "react";
import styled from "styled-components";
import { device } from "../../styles/media";

interface SplitScreenProps {
  left: ReactNode;
  right: ReactNode;
  heading: string;
  leftWeight?: number;
  rightWeight?: number;
}
export const SplitScreen: FunctionComponent<SplitScreenProps> = ({
  left: Left,
  right: Right,
  heading,
  leftWeight = 1,
  rightWeight = 1,
}) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <ElementContainer>
        <LeftItem data-testid='left-component' leftWeight={leftWeight}>{Left}</LeftItem>
        <RightItem rightWeight={rightWeight}>{Right}</RightItem>
      </ElementContainer>
    </Container>
  );
};

export const Container = styled.section`
  box-sizing: border-box;
  overflow: hidden;
  max-width: 1130px;
  margin: 0 auto;

`;
const Heading = styled.h2`
  padding: 10px 20px;
  background-color: yellowgreen;
`;
const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
  align-items: center;
  @media ${device.desktop} {
    gap: 30px;
    flex-direction: row;
    align-items: unset;
  }
`;
const LeftItem = styled.div<Pick<SplitScreenProps, "leftWeight">>`
  margin: 10px;
  max-width: 100%;
`;
const RightItem = styled.div<Pick<SplitScreenProps, "rightWeight">>`
  margin: 10px;
  max-width: 100%;
`;
