import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ImageProps {
  placeholderUrl: string;
  originalUrl: string;
  className?: string;
  title: string;
  height?: string;
}
const ProgressiveImage = ({
  className = "",
  originalUrl,
  placeholderUrl,
  title,
  height = "70%",
}: ImageProps) => {
  const [imgSource, setImgSource] = useState(placeholderUrl);
  const imageRef = useRef(null);
  const [intersecting, setIntersecting] = useState(false);

  // Use intersection api to observe each image
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]; // observing only one element
      // console.log('is intersecting....', entry.isIntersecting, entry.target.getAttribute('alt'))
      setIntersecting(entry.isIntersecting);
    }, { threshold: .5});
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [intersecting]);

  // Do not download the original url until image in focus
  useEffect(() => {
    if(!intersecting){
      return
    }
    // Very interesting way of subscribing to image load
    const image = new Image();
    image.src = originalUrl;
    image.onload = () => {
      console.log("Image source loaded", image.src);
      // image loaded, now set the source to original url
      setImgSource(originalUrl);
    };
  }, [originalUrl, intersecting]);

  return (
    <ImageContainer  ref={imageRef} className={className} $height={height}>
      <img src={imgSource} alt={title} />
    </ImageContainer>
  );
};

const ImageContainer = styled.div<{ $height: string }>`
  width: 100%;
  height: ${(props) => props.$height};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ProgressiveImage;
