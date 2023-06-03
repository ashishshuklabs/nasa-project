import { StaticRouter } from "react-router-dom/server";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import type Express from "express";
import { createRouteElements } from "../routes";
import { Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import { DataType, getData } from "../api/requests/planets";
import {
  fetchPlanetsFailure,
  fetchPlanetsSuccess,
} from "../pages/home/planets.slice";

export async function render(
  req: Express.Request,
  initialData: (data: string) => void,
  appStyles: (styles: string) => void
) {
  const sheet = new ServerStyleSheet();
  // Fetch planets data and setup initial data in store
  // Eventually pass this data to the client
  const planets = await getData<DataType>();

  if (typeof planets === "object") {
    //success
    store.dispatch(fetchPlanetsSuccess(planets));
  } else {
    // error
    store.dispatch(fetchPlanetsFailure(planets));
  }

  // Get the state from the store and set it up as initial data for the client
  const planetsData = store.getState().planets;
  // styled components recommends wrapping the style grabbing code in try-catch
  // to ensure styles are capured and sheet instance is appropriately garbage collected
  try {
    // render app and collect app styles. Do not return response to the browser yet
    renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouter location={req.originalUrl}>
            <Routes>{createRouteElements()}</Routes>
          </StaticRouter>
        </Provider>
      )
    );
    // Get all style tags and pass it to the callback
    appStyles(sheet.getStyleTags());
  } catch (e: unknown) {
    console.log("style grab failed..", e instanceof Error ? e.message : e);
  } finally {
    sheet.seal();
  }
  initialData(JSON.stringify(planetsData));

  // Now we have all data, return the SSR'd app
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={req.originalUrl}>
          <Routes>{createRouteElements()}</Routes>
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );
}
