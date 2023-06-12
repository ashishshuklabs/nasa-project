// ToDo: Just generate array not render the content please.....

import { SlideType } from "./Slider.component";

// children will be the array of slides
export const getSlidesWithContent = <T extends Record<string, string | number>>(children: T[], renderer: (data: T, type: SlideType) => JSX.Element) => {
  // build clones of first and last slide
  const [firstSlideClone, ...rest] = children;
  const newNodes = [...children];
  const [lastSlideClone, ...others] = newNodes.reverse()
  // final array with cloned slide with length n + 2
  const result = [lastSlideClone, ...children, firstSlideClone]
  // Use the renderer to generate JSX for each individual slide
  return result.map((res, i) => i === 0 || i === result.length - 1 ? renderer(res, 'clone') : renderer(res, 'original'))
}

