import React, { MouseEvent, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import one from "../../assets/images/1-img.png";
import two from "../../assets/images/2-img.png";
import three from "../../assets/images/3-img.png";
import four from "../../assets/images/4-img.png";

// This should be a prop and passed in as children JSX
const slides = [
  {
    image: one,
    title: "Title 1 for test",
    description: "title 1 description",
  },
  {
    image: two,
    title: "Title 2 for test",
    description: "title 2 description",
  },
  {
    image: three,
    title: "Title 3 for test",
    description: "title 3 description",
  },
  {
    image: four,
    title: "Title 4 for test",
    description: "title 4 description",
  },
];

const slideWidth = "500px"; // this can be a prop and needs to be passed to container and slide

export const Carousel = () => {
  // starting with two extra slides one before and other after, so should start with slide on index 1 rather than 0 which would be copy of last slide
  // Real slider index range should be 1 through length of
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const addSlideLeft = () => {
    const lastSlide = [...slides];
    const output = [];
    output.push(lastSlide.reverse()[0]);
    return output;
  };

  const addSlideRight = () => {
    const [firstSlide, ...others] = slides;
    const output = [];
    output.push(firstSlide);
    return output;
  };
  const generateSlides = (s: typeof slides, isClone = false) => {
    let newKey = 0;
    if (s.length === 1) {
      newKey = Math.random() * 9;
    }
    return s.map((slide, i) => {
      return (
        <Slide
          key={i}
          $slideWidth={slideWidth}
          data-testid={`${isClone ? `clone-${i}` : `original-${i}`}`}
        >
          <h1>{slide.title}</h1>
          <div>
            <img alt={slide.title} src={slide.image} />
          </div>
          <p>{slide.description}</p>
        </Slide>
      );
    });
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    direction: "right" | "left"
  ) => {
    // Knowing that we're transitioning helps in saving the current slide state
    // If clicking too fast skip the click
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
    <Container style={{width: slideWidth}}>
      <Button
        className="left"
        type="button"
        onClick={(e) => handleClick(e, "left")}
      >
        Prev
      </Button>
      <Button
        className="right"
        type="button"
        onClick={(e) => handleClick(e, "right")}
      >
        Next
      </Button>

      <Slider style={sliderStyle} onTransitionEnd={handleTransition}>
        {generateSlides(addSlideLeft())}
        {generateSlides(slides)}
        {generateSlides(addSlideRight())}
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
  top: 20%;
  transform: translateY(-50%);
  z-index: 50;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
`;
const Slider = styled.div`
  border: 1px solid yellow;
  width: 100%;
  height: 100%;
  display: flex;
  /* gap: 20px; */
  /* flex-shrink: 0; */
  flex: 1;
`;

const Slide = styled.div<{ $slideWidth: string }>`
  width: ${(props) => props.$slideWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 ${(props) => props.$slideWidth};
  div {
    height: 70%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
