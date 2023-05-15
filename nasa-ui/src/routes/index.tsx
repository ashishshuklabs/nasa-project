import { Route, Routes } from "react-router-dom";
import About from "../pages/about/About.page";
import Contact from "../pages/contact/Contact.page";
import Homepage from "../pages/home/Home.page";
import { BaseLayout } from "../pages/common/BaseLayout";

export function createRouteElements() {
  return (
    // <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route element={<Homepage />} index />
        <Route element={<About />} path="about" />
        <Route element={<Contact />} path="contact" />
      </Route>
    // </Routes>
  );
}
