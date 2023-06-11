import React, {
  MouseEvent,
  useEffect,
  useState,
  useRef,
  ReactNode,
  TouchEvent,
} from "react";
import styled from "styled-components";
import imagesData from "./images.json";
import ProgressiveImage from "./ProgressiveImage.component";
import { ReactComponent as Arrow } from "../../assets/icons/arrow-right.svg";
const SLIDE_WIDTH = "500px"; // this can be a prop and needs to be passed to container and slide

const generateSlides = (
  s: typeof imagesData,
  isClone = false,
  slideWidth = SLIDE_WIDTH
) => {
  let newKey = 0;
  if (s.length === 1) {
    newKey = Math.ceil(Math.random() * 99);
  }
  return s.map((slide, i) => {
    return (
      <Slide
        key={newKey !== 0 ? newKey : i}
        $slideWidth={slideWidth}
        // data-testid='slide'
        data-testid={`${isClone ? `clone` : `original`}-slide`}
      >
        <h1>{slide.title}</h1>
        <ProgressiveImage
          key={slide.id}
          placeholderUrl={slide.src}
          title={slide.title}
          originalUrl={slide.src.replace("&w=10&", "&w=500&")}
        />
        <p>{slide.description}</p>
      </Slide>
    );
  });
};
type CarouselProps = {
  slideWidth: string;
};
export const Carousel = ({ slideWidth = SLIDE_WIDTH }: CarouselProps) => {
  // starting with two extra slides one before and other after, so should start with slide on index 1 rather than 0 which would be copy of last slide
  // Real slider index range should be 1 through length of
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = imagesData;
  const getLeftSlide = () => {
    const lastSlide = [...slides].reverse()[0];
    return Array(lastSlide);
  };

  const getRightSlide = () => {
    const [firstSlide, ...others] = slides;
    return Array(firstSlide);
  };

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
    if (currentSlide === slides.length || currentSlide === 1) {
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
      setCurrentSlide(slides.length);
      setTransitionEnabled(false);
    }
    // First slide swiped in at when at last slide
    if (currentSlide === slides.length + 1) {
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

      <Slider
        data-testid="slider"
        style={sliderStyle}
        onTouchMove={(e) => handleClick(e, "left")}
        onTransitionEnd={handleTransition}
      >
        {generateSlides(getLeftSlide(), true, slideWidth)}
        {generateSlides(slides, false, slideWidth)}
        {generateSlides(getRightSlide(), true, slideWidth)}
      </Slider>
    </Container>
  );
};

const Container = styled.section<{ $width: string }>`
  width: calc(${(props) => props.$width} - 2px); // take out 1px for the border or any margin added
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
const Slider = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
`;

const Slide = styled.div<{ $slideWidth: string }>`
  width: ${(props) => props.$slideWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 ${(props) => props.$slideWidth};
`;

const ArrowRight = styled(Arrow)``;
const ArrowLeft = styled(Arrow)`
  transform: rotate(-180deg);
`;
