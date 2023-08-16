﻿# nasa-project
### Server side rendering with streaming api (feature/suspense-stream-render-react)
#### Takeaways
1. Used context api
2. Used `Suspense` component
3. Explored node streams and streaming api in react
4. Implemented suspended data fetching [inspiration from https://github.com/XiNiHa/streaming-ssr-showcase and gaearon (https://codesandbox.io/s/kind-sammet-j56ro, https://github.com/facebook/react/issues/1739)]
5. Created generic way of fetching data and passing it to specific components by wrapping them with `Suspense` and feeding data via `Context`.
6. On SSR, added script with data, suspended data fetch on client browser refresh, cached data otherwise via `window` object.
7. Have issues with `styled-component` but anyways that wasn't the main goal here.
