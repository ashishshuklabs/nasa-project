import React, { ReactNode, createContext, useContext } from "react";
import { fetchPokemonWithWrapper } from "../../api/requests/pokemon";
import { Pokemon } from "../types";

// Ensure the file extension is .tsx else react will complain, as we're returning jsx in the ServerProvider

// We could have implemented data caches here so that hitting refresh button
// would not fetch the data and would rather rendered cached data, but seriously have 
// no apetite for it at the moment, given the current approach doesn't get rid of the hydration error.
type ProviderProps = {
  cache?: Map<string, any>;
  children: ReactNode;
};
type ContextData = Map<string, any>;
const ServerContext = createContext<ContextData>(null as any);

const globalCache = new Map<string, any>(); // empty cache

const ServerProvider = ({ cache, children }: ProviderProps) => {
  return (
    <ServerContext.Provider
      value={
        cache ??
        (typeof window !== "undefined" ? globalCache : new Map<string, any>())
      }
    >
      {children}
    </ServerContext.Provider>
  );
};

//need a map with id and loader as prop
// if you wrap multiple components with server
// context, else it'll render the last fetched
// for all
const useServerData = (id: string, fetcher: {read: () => any}): { loaderScript: ReactNode; value: any } => {
  const ctx = useContext(ServerContext);

  console.log("Value of context is......", ctx);

  const isServer = typeof window === "undefined";

  console.log("Is server side????", isServer);

  // generate script tag with the data retrieved and return it, we must use dangerouslySetHTML
  // Else, as in the below code, this will just be passed in as a string instead of HTML
  // const loadScript = (data: any) => `<script>window.ChunkData=${JSON.stringify(data)}</script>`

  const loadScript = (id: string, data: any) => (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        window.ChunkData =[...(window.ChunkData ?? []), ${JSON.stringify({[id]: globalCache.get(id)})}]
    `,
      }}
    />
  );

  if (isServer) {
    // this is server data fetching now and the data should be set on the window object using the loadScript
    // so it shouldn't be fetched client side at all
    const data: Pokemon = fetcher.read();
    globalCache.set(id, data)
    const script = loadScript(id, data);
    console.log("glob is...", script);
    return {
      loaderScript: script,
      value: data,
    };
  }
  // On Client side, just return the data attached with the window object (during server render)
  console.log("this is client request, returning....", window.ChunkData && window.ChunkData, 'id si......', id);
  // If data fetched on SSR, return data from window object
  // if page refreshed page and then page with suspense navigated,
  // we need to fetch the data again, hence calling the suspender again 
  return {
    loaderScript: null,
    value: window.ChunkData ? window.ChunkData.filter(e => id in e)[0][id]: fetcher.read(), // return data based on path/resource id
  };
};

export { ServerContext, ServerProvider, useServerData };
