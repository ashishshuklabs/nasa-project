import { StaticRouter } from "react-router-dom/server";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import React from "react";
import type Express from "express";
import App from "../App";
import { createRouteElements } from "../routes";
import { Routes } from "react-router-dom";

export async function render(
  req: Express.Request,
  initialData: (data: string) => void
) {
  const a = new Promise((res, reject) => {
    setTimeout(() => {
      res("wjat the...");
    }, 1000);
  });

  const data = await a;
  
    initialData(String(data))
    return renderToString(
      <React.StrictMode>
        <StaticRouter location={req.originalUrl}>
          {/* <App /> */}
          <Routes>{createRouteElements()}</Routes>
        </StaticRouter>
      </React.StrictMode>
    );
}
