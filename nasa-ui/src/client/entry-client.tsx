import {
  BrowserRouter,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import { createRouteElements } from "../routes";
import { createStore } from "../store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(createRouteElements())
);
const container = document.getElementById("root")!;
const store = createStore({ planets: window.INITIAL_STATE });
hydrateRoot(
  container,
  <Provider store={store}>
    <BrowserRouter>
      <Routes>{createRouteElements()}</Routes>
    </BrowserRouter>
  </Provider>
);
