import React from "react";
import { PlanetType } from "../../pages/home/Home.page";
import styled from "styled-components";
import { BaseCard } from "./BaseCard";

interface CardProps {
  data: PlanetType;
}

const PlanetsCard = ({ data }: CardProps) => {
  const getChildren = () => (
    <>
      <Heading>{data.name}</Heading>
      <Body>{data.body}</Body>
      <Email href={data.email}>Find out more</Email>
    </>
  );
  return <BaseCard children={getChildren()}></BaseCard>;
};

const Heading = styled.h1``;

const Body = styled.p``;

const Email = styled.a``;

export default PlanetsCard;
