import { RootState } from "src/store/rootReducer";
import { Carousel } from "../../components/carousel/Carousel.component";
import { useSelector, useStore } from "react-redux";
import { Card } from "../../components/card/card.component";
import styled from "styled-components";
import { SplitScreen } from "../layout/SplitScreen";
export type PlanetType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
const Home = () => {
  // The homepage uses global state for rendering. Global state is coming from redux and
  // after initial data fetch during ssr, this data is passed in as initial state to the store
  // during client hydration. So it doesn't need to be fetched in useEffect anymore during
  // initial paint
  const { loading, planets, error } = useSelector(
    (state: RootState) => state.planets
  );

  const getPlanets = () =>
    typeof planets !== "string" ? (
      <CardContainer>
        {planets.map((planet) => (
          <Card key={planet.id} data={planet} />
        ))}
      </CardContainer>
    ) : null;

  return (
    <div>
      <h1>Planets Homepage</h1>
      <SplitScreen
        heading={
          loading ? "Loading...." : `Loaded ${planets?.length} planets in total`
        }
        left={<Carousel slideList={[]} slideWidth="100%" />}
        right={getPlanets()}
      />
    </div>
  );
};

export default Home;

const CardContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
