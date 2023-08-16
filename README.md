# nasa-project
 ## Goals
 ### Server side rendering without streaming api (main branch)
 #### Takeaways
 1. Implemented custom `Carousel` component with skeletal and lazy loading images and infinite scrolling
 3. Redux client side setup
 4. Redux server side setup
 5. Loading app data client side
 6. Loading app data server side
 7. Loading route based data server side
 8. Passing data to client from server
 9. Extracting styles server side

### Server side rendering with streaming api (feature/suspense-stream-render-react)
#### Takeaways
1. Used context api
2. Used `Suspense` component
3. Explored node streams and streaming api in react
4. Implemented suspended data fetching [inspiration from https://github.com/XiNiHa/streaming-ssr-showcase and gaearon (https://codesandbox.io/s/kind-sammet-j56ro, https://github.com/facebook/react/issues/1739)]
5. Created generic way of fetching data and passing it to specific components by wrapping them with `Suspense` and feeding data via `Context`.
6. On SSR, added script with data, suspended data fetch on client browser refresh, cached data otherwise via `window` object.
7. Have issues with `styled-component` but anyways that wasn't the main goal here.
