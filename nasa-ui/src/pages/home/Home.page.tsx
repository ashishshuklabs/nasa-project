import { RootState } from "src/store/rootReducer";
import {
  SlideContent,
  SlideType,
  Slider,
} from "../../components/carousel/Slider.component";
import { useSelector, useStore } from "react-redux";
import { Card } from "../../components/card/card.component";
import styled from "styled-components";
import { SplitScreen } from "../layout/SplitScreen";
import imagesData from "../../components/carousel/images.json";
import { Slide } from "../../components/carousel/Slide.component";

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

  // Make sure to add key prop to renderProp as the content being rendered will be an array. This is
  // to avoid unique key prop warning from react.
  return (
    <div>
      <h1>Planets Homepage</h1>
      <SplitScreen
        heading={
          loading ? "Loading...." : `Loaded ${planets?.length} planets in total`
        }
        left={
          <Slider
            slideWidth="100%"
            content={imagesData}
            renderContent={(slide: SlideContent, type: SlideType) => (
              <Slide key={`${slide.id}-${type}`} content={slide} type={type} />
            )}
          />
        }
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
