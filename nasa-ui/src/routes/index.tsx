import { ActionFunction, Route, RouteObject, Routes } from "react-router-dom";
import About, { loadPokes } from "../pages/about/About.page";
import Contact from "../pages/contact/Contact.page";
import Homepage from "../pages/home/Home.page";
import { BaseLayout } from "../pages/common/BaseLayout";
import { Store } from "@reduxjs/toolkit";
// We could extend route object like below, to support any field that
// we could pass to a route object.
// interface Blah extends Omit<RouteObject,'children'>{
//   handler: any;
// }
export const routesWithStore = (store: Store): RouteObject[] => {
  return [
    {
      path: "/",
      element: <BaseLayout />, // This is the new way, do not define path and this would be a layout element available everywhere
      children: [
        {
          path: "/",
          index: true,
          element: <Homepage />,
        },
        {
          path: "/about",
          element: <About />,
          handle: () => loadPokes(store), // handler accepts anything, we're using it for our own custom loader function
        },
        {
          path: "/contact-us",
          element: <Contact />,
        },
      ],
    },
  ];
};
