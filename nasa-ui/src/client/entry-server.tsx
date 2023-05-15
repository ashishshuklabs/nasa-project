import { StaticRouter } from "react-router-dom/server";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import type Express from "express";
import App from "../App";
import { createRouteElements } from "../routes";
import { Routes } from "react-router-dom";

export async function render(
  req: Express.Request,
  initialData: (data: string) => void,
  appStyles: (styles: string) => void
) {
  const a = new Promise((res, reject) => {
    setTimeout(() => {
      res("wjat the...");
    }, 1000);
  });
  const sheet = new ServerStyleSheet();

  const data = await a;
  // render app and collect app styles. Do not return to the browser yet
  renderToString(
    sheet.collectStyles(
      <React.StrictMode>
        <StaticRouter location={req.originalUrl}>
          {/* <App /> */}
          <Routes>{createRouteElements()}</Routes>
        </StaticRouter>
      </React.StrictMode>
    )
  );
  // Get all style tags and pass it to the callback
  appStyles(sheet.getStyleTags())
  initialData(String(data));
  // Now we have all data, return the SSR'd app
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={req.originalUrl}>
        {/* <App /> */}
        <Routes>{createRouteElements()}</Routes>
      </StaticRouter>
    </React.StrictMode>
  );
}
