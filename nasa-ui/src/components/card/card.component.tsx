import React from "react";
import { PlanetType } from "../../pages/home/Home.page";
import styled from "styled-components";

interface CardProps {
  data: PlanetType;
}

export const Card = ({ data }: CardProps) => {
  return (
    <Container>
      <Heading>{data.name}</Heading>
      <Body>{data.body}</Body>
      <Email href={data.email}>Find out more</Email>
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
`;

const Heading = styled.h1``;

const Body = styled.p``;

const Email = styled.a`
  
`
