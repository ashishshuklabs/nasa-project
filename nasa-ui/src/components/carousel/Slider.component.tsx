import React, {
  MouseEvent,
  useState,
  TouchEvent,
  useMemo,
} from "react";
import styled from "styled-components";
import { getSlidesWithContent } from "./utils";
import { ReactComponent as Arrow } from "../../assets/icons/arrow-right.svg";
const SLIDE_WIDTH = "500px"; // this can be a prop and needs to be passed to container and slide

// type of inidividual object from JSON
export type SlideContent = Record<string, string | number>;
export type SlideType = 'clone' | 'original';
// renderContent is a renderer function (following renderProps pattern). This function specifies how
// each element is to be rendered
type SliderProps = {
  slideWidth: string;
  content: SlideContent[]; // This could be the data from json file
  renderContent: (slide: SlideContent, type: SlideType) => JSX.Element; // This is how the content should be rendered
};
export const Slider = ({
  content,
  renderContent,
  slideWidth = SLIDE_WIDTH,
}: SliderProps) => {
  // starting with two extra slides one before and other after, so should start with slide on index 1 rather than 0 which would be copy of last slide
  // Real slider index range should be 1 through length of
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // generate slides once and forget
  const generatedSlides = useMemo(() => {
    return getSlidesWithContent<SlideContent>(content, renderContent)
  },[])
  const handleClick = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLDivElement>,
    direction: "right" | "left"
  ) => {
    // Knowing that we're transitioning helps in saving the current slide state
    // If clicking too fast skip the click,this will prevent errors in setting
    // invalid state calculation for the slide
    if (isTransitioning) {
      console.log("skipping, clicked too fast....");
      return;
    }
    setIsTransitioning(true);
    // index range should be 1 through slides.length. Slides in this index range are the original slides
    // One before and after this range are clones.
    if (currentSlide === content.length || currentSlide === 1) {
      setTransitionEnabled(true);
    }
    if (direction === "left") {
      setCurrentSlide((index) => index - 1);
      return;
    }
    setCurrentSlide((index) => index + 1);
  };

  const handleTransition = () => {
    setIsTransitioning(false);
    // last slide needs to be swiped in with transition disabled
    if (currentSlide === 0) {
      setCurrentSlide(content.length);
      setTransitionEnabled(false);
    }
    // First slide swiped in at when at last slide
    if (currentSlide === content.length + 1) {
      setCurrentSlide(1);
      setTransitionEnabled(false);
    }
  };

  const sliderStyle: React.CSSProperties = {
    transform: `translateX(calc(${currentSlide} * -${slideWidth}))`,
    transition: transitionEnabled ? "transform 1s ease-in-out" : "none",
  };

  return (
    <Container $width={slideWidth} data-testid="slide-container">
      <Button
        className="left"
        type="button"
        onClick={(e) => handleClick(e, "left")}
      >
        <ArrowLeft title="Prev" />
      </Button>
      <Button
        className="right"
        type="button"
        onClick={(e) => handleClick(e, "right")}
      >
        <ArrowRight title="Next" />
      </Button>

      <SlidesContainer
        data-testid="slider"
        style={sliderStyle}
        onTouchMove={(e) => handleClick(e, "left")}
        onTransitionEnd={handleTransition}
      >
        {generatedSlides}
      </SlidesContainer>
    </Container>
  );
};

const Container = styled.section<{ $width: string }>`
  width: calc(
    ${(props) => props.$width} - 2px
  ); // take out 1px for the border or any margin added
  height: 300px;
  max-width: 700px;

  background-color: #fff;
  position: relative;
  overflow: hidden;
  border: 1px solid #232323;
`;
const Button = styled.button`
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  background-color: rgba(243, 243, 243, 0.7);
  border: none;
  border-radius: 100%;
  line-height: 100%;
  font-size: 30px;
  text-align: center;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
  &:hover {
    background-color: rgba(243, 243, 243, 0.9);
  }
`;
const SlidesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
`;

const ArrowRight = styled(Arrow)``;
const ArrowLeft = styled(Arrow)`
  transform: rotate(-180deg);
`;
