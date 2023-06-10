import React, { ReactNode } from "react";
import styled from "styled-components";
interface SlideProps {
  slideWidth: string;
  child: ReactNode;
}
export const Slide = ({ child, slideWidth }: SlideProps) => (
  <SlideComponent $slideWidth={slideWidth}>{child}</SlideComponent>
);

const SlideComponent = styled.div<{ $slideWidth: string }>`
  width: ${(props) => props.$slideWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 ${(props) => props.$slideWidth};
`;
