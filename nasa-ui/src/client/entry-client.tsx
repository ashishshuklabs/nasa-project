import {
  BrowserRouter,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import { createRouteElements } from "../routes";
import App from "../App";

const router = createBrowserRouter(
  createRoutesFromElements(createRouteElements())
);
const container = document.getElementById("root")!;
hydrateRoot(
  container,
  <BrowserRouter>
    <Routes>{createRouteElements()}</Routes>
  </BrowserRouter>
);
