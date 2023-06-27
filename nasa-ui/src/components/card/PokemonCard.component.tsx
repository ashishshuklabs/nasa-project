import React from "react";
import styled from "styled-components";
import { BaseCard } from "./BaseCard";
import { Pokemon } from "../../api/types";
import { device } from "../../styles/media";

interface PokemonCardProps {
  data: Pokemon;
}

const PokemonCard = ({ data }: PokemonCardProps) => {
  const getChildren = () => (
    <Container data-testid="pokemon-card">
      <Content>
        <Heading>Name: {data.name}</Heading>
        <Body>
          <b>Order:</b>
          <span>{data.order}</span>{" "}
        </Body>
        <Span>
          <b>Encountered Location:</b>{" "}
          <span>{data.location_area_encounters}</span>
        </Span>
      </Content>
      <ImageContainer>
        <Image src={data.sprites?.front_shiny} alt={data.name} />
      </ImageContainer>
    </Container>
  );
  return <BaseCard children={getChildren()}></BaseCard>;
};
const Container = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: whitesmoke;
  
  @media ${device.tablet} {
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
    background: transparent
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;
  @media ${device.tablet} {
    order: unset;
  }
`;
const Heading = styled.h1`
  text-transform: capitalize;
`;

const Body = styled.p``;
const ImageContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  order: 0;
  align-self: center;
  border-bottom: 1px solid lightgray;
  @media ${device.tablet} {
    order: 1;
    border-bottom: none;
    border-left: 1px solid lightgray;
  }
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Span = styled.span`
  white-space: break-spaces;
  span {
    word-break: break-all;
  }
`;

export default PokemonCard;
