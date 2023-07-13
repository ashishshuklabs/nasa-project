import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonAsync } from "./pokemon.slice";
import { RootState } from "src/store/rootReducer";
import store, { AppThunk } from "../../store/store";
import PokemonCard from "../../components/card/PokemonCard.component";
import { AnyAction, Store, ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const About = () => {
  // This should get updated with ssr?
  // Update: Data is getting loaded, how do we pass it here, may be via window object???? That's next
  // But great win with Handle object in react router that lets us pass our loader function
  // for fetching route data
  const dispatch = useDispatch();
  const { error, pokeLoading, pokemon } = useSelector(
    (state: RootState) => state.pokemon
    );


  // ToDo: Fix the type on the dispatcher
  return (
    <>
      <section>
        <h1>About us page</h1>
        <Button
          type="button"
          onClick={() =>
            dispatch(
              fetchPokemonAsync(
                `${Math.ceil(Math.random() * 100)}`
              ) as unknown as AnyAction
            )
          }
        >
          {pokeLoading ? "Loading..." : "New Poke Please"}
        </Button>
        {<PokemonCard data={pokemon} />}
      </section>
      <BackLink type="button" to="/">
        Back
      </BackLink>
    </>
  );
};
const BackLink = styled(Link)`
  text-underline-offset: 2px;
  :hover {
    text-decoration: none;
  }
`;
const Button = styled.button`
  max-width: 200px;
  margin: 20px;
  width: 100%;
  cursor: pointer;
`;
// A generic function to load data on page load.
// ToDo: Fix types for these
const loadPokes = (store: Store, idOrName = '100') => {
  console.log('is store ready..........', {store})
  return store.dispatch(fetchPokemonAsync(idOrName) as unknown as AnyAction);
};
export { loadPokes };
export default About;
