import { RootState } from "src/store/rootReducer";
import { Carousel } from "../../components/carousel/Carousel.component";
import { useSelector, useStore } from "react-redux";

const Home = () => {
  // The homepage uses global state for rendering. Global state is coming from redux and 
  // after initial data fetch during ssr, this data is passed in as initial state to the store
  // during client hydration. So it doesn't need to be fetched in useEffect anymore during
  // initial paint
  const { loading, planets, error } = useSelector(
    (state: RootState) => state.planets
  );
 
  const getPlanets = () =>
    typeof planets !== "string" &&
    planets.map((planet) => (
      <li key={planet.postId}>
        <h1>{planet.name}</h1>
        <p>{planet.email}</p>
        <p>{planet.body}</p>
      </li>
    ));

  return (
    <div>
      <h1>HomePage</h1>
      <Carousel />
      <h1>Planets data</h1>
      {loading && <div>Loading....</div>}
      {!loading && `Loaded ${planets?.length} planets in total`}
      {!loading && <ul>{getPlanets()}</ul>}
    </div>
  );
};

export default Home;
