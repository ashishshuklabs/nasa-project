import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonAsync } from "./pokemon.slice";
import { RootState } from "src/store/rootReducer";
import store from "../../store/store";
import PokemonCard from "../../components/card/PokemonCard.component";
import { AnyAction } from "@reduxjs/toolkit";

const About = () => {
  const { error, loading, pokemon } = useSelector(
    (state: RootState) => state.pokemon
  );

  const dispatch = useDispatch();
  // ToDo: Fix the type on the dispatcher
  return (
    <section>
      <h1>About us page</h1>
      <button
        style={{ maxWidth: "200px", margin: "20px auto", width: "100%" }}
        type="button"
        onClick={() =>
          dispatch(
            fetchPokemonAsync(
              `${Math.ceil(Math.random() * 100)}`
            ) as unknown as AnyAction
          )
        }
      >
        {loading ? "Loading..." : "New Poke Please"}
      </button>
      {<PokemonCard data={pokemon} />}
    </section>
  );
};

// A generic function to load data on page load. Just to check if thunk is working or not
const loadPokes = (idOrName: string) => {
  store.dispatch(fetchPokemonAsync(idOrName));
};

export default About;
