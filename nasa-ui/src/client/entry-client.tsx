import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import { routesWithStore } from "../routes";
import { createStore } from "../store/store";
import { Provider } from "react-redux";

const container = document.getElementById("root")!;
const store = createStore(window.INITIAL_STATE);
console.log(window.INITIAL_STATE?.pokemon)
const router =createBrowserRouter(routesWithStore(store));
hydrateRoot(
  container,
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
);
