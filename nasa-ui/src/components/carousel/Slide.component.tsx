import React, { ReactNode } from "react";
import styled from "styled-components";
import { SlideContent } from "../../components/carousel/Slider.component";
import ProgressiveImage from "./ProgressiveImage.component";

interface SlideProps {
  content: SlideContent;
  type: 'clone'|'original';
}
export const Slide = ({ content, type }: SlideProps) => {
  const key = `slide-${type}-${content.id}`;
  return (
  <Container
    key={key}
    data-testid={key}
  >
    <h1>{content.title}</h1>
    <ProgressiveImage
      key={key}
      placeholderUrl={content.src.toString()}
      title={content.title.toString()}
      originalUrl={content.src.toString().replace("&w=10&", "&w=500&")}
    />
    <p>{content.description}</p>
  </Container>
)};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
`;
