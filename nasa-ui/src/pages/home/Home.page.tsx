import usePlanets from "../../api/hooks/usePlanet";
import { Carousel } from "../../components/carousel/Carousel.component";

const Home = () => {
  const { error, planets, loading } = usePlanets();
  console.log(planets);
  const getPlanets = () => {
    return <li>{planets && JSON.stringify(planets)}</li>;
  };
  return (
    <div>
      <h1>HomePage</h1>
      <Carousel />
      <h1>Palnets data</h1>
      {loading && <div>Loading....</div>}
      {!loading && `Loaded ${planets?.length} planets in total`}
      {!loading && <ul>{getPlanets()}</ul>}
    </div>
  );
};

export default Home;