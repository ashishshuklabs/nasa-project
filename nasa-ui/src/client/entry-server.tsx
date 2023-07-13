import {
  StaticHandlerContext,
  StaticRouter,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import type Express from "express";
import { routesWithStore as routes } from "../routes";
import { matchRoutes } from "react-router-dom";
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
  // Fetching route data now
  // Route object has an action object that we could explore and it returns a promise
  // so it is indeed promising.

  const completeRoutes = routes(store);
  const matched = matchRoutes(completeRoutes, req.path);

  let promises: Promise<any>[] = []; // array of promises, all path specific data loader functions.
  if (matched) {
    // ToDo: Fix this
    // Just returns BaseLayout which is the root so search children
    const parent = matched[0].route.children;
    parent?.forEach((r) => {
      if (r.handle) {
        promises.push(r.handle());
      }
      return promises;
    });
  }
  let { query } = createStaticHandler(completeRoutes);
  // All this to make things work via remix garbage
  // horrible crap, but atleast
  let remixRequest = createFetchRequest(req);
  let context = await query(remixRequest);
  if (context instanceof Response) {
    throw context;
  }
  const staticRouter = createStaticRouter(completeRoutes, context);
  const RouteProvider = () => (
    <StaticRouterProvider
      router={staticRouter}
      context={context as any}
      nonce="the-nonce"
    />
  );
  // (1) Get the state from the store and set it up as initial data for the client,
  // But wait this is a mistake, because route data is not fetched yet. So this
  // should be moved to after all promises have been fulfilled
  // const allData = store.getState();
  // styled components recommends wrapping the style grabbing code in try-catch
  // to ensure styles are capured and sheet instance is appropriately garbage collected
  try {
    // render app and collect app styles. Do not return response to the browser yet
    renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <RouteProvider />
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
  // (1) see note below
  const fetched = async() =>
    Promise.all(promises).then(() => {
      // Now we have all data, return the SSR'd app
      // return Promise.resolve("done"); // returning for completeness, tbh we don't need to, as long as promise fulfilled
      // Get the state from the store and set it up as initial data for the client
      const allData = store.getState(); // (1) Now this should have all the data unlike 
      
      initialData(JSON.stringify(allData));
      console.log('poekdate is:', allData.pokemon.pokeLoading)
    });
  await fetched(); // (1) need to fetch the data before returning response, promise is not really a blocking code by design
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <RouteProvider />
      </Provider>
    </React.StrictMode>
  );
}

export function createFetchRequest(req: Express.Request): Request {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
