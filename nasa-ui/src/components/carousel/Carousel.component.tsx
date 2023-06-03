import React, { MouseEvent, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import imagesData from "./images.json";
import ProgressiveImage from "./ProgressiveImage.component";

const SLIDE_WIDTH = "500px"; // this can be a prop and needs to be passed to container and slide

const generateSlides = (s: typeof imagesData, isClone = false) => {
  let newKey = 0;
  if (s.length === 1) {
    newKey = Math.random() * 9;
  }
  return s.map((slide, i) => {
    return (
      <Slide
        key={i}
        $slideWidth={SLIDE_WIDTH}
        data-testid={`${isClone ? `clone-${i}` : `original-${i}`}`}
      >
        <h1>{slide.title}</h1>
        <ProgressiveImage
          key={slide.id}
          placeholderUrl={slide.src}
          title={slide.title}
          originalUrl={slide.src.replace('&w=10&','&w=500&')}
        />
        <p>{slide.description}</p>
      </Slide>
    );
  });
};

export const Carousel = () => {
  // starting with two extra slides one before and other after, so should start with slide on index 1 rather than 0 which would be copy of last slide
  // Real slider index range should be 1 through length of
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = imagesData;
  const getLeftSlide = () => {
   const lastSlide = [...slides].reverse()[0];
   return Array(lastSlide)
  }

  const getRightSlide = () => {
    const [firstSlide, ...others] = slides;
    return Array(firstSlide)
  };
 

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
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
    transform: `translateX(calc(${currentSlide} * -${SLIDE_WIDTH}))`,
    transition: transitionEnabled ? "transform 1s ease-in-out" : "none",
  };

  return (
    <Container style={{ width: SLIDE_WIDTH }}>
      <Button
        className="left"
        type="button"
        onClick={(e) => handleClick(e, "left")}
      >
        &larr;
      </Button>
      <Button
        className="right"
        type="button"
        onClick={(e) => handleClick(e, "right")}
      >
        &rarr;
      </Button>

      <Slider style={sliderStyle} onTransitionEnd={handleTransition}>
        {generateSlides(getLeftSlide(), true)}
        {generateSlides(slides)}
        {generateSlides(getRightSlide(), true)}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 400px;
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
  background-color: rgba(243,243,243,0.7);
  border: none;
  border-radius: 100%;
  padding: 10px;
  line-height: 100%;
  font-size: 30px;
  text-align: center;
  
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
  &:hover {
    background-color: rgba(243,243,243,0.9);
  }
`;
const Slider = styled.div`
  border: 1px solid yellow;
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
