import React, { ReactNode, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../../components/card/PokemonCard.component";
import { ServerProvider, useServerData } from "../../api/context/serverContext";
import { fetchPokemonWithWrapper } from "../../api/requests/pokemon";
import styled from "styled-components";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button
      style={{
        width: "120px",
        height: "30px",
        borderRadius: "5px",
        background: "#232323",
        color: "#fff",
      }}
      onClick={() => setCount((i) => i + 1)}
    >
      {count}
    </button>
  );
};
const Consumer: React.FC<{
  id: string,
  fetcher:{read: () => any}
  children: (data: any) => ReactNode;
}> = ({ fetcher, id, children }) => {
  const {loaderScript, value} = useServerData(id, fetcher);
  // loader script should be set only on SSR and value should be passed
  // in during client render
  // console.log('env: Server:', typeof window === 'undefined', 'loader script:', loaderScript, 'value is..', value)
  return <>
  {loaderScript}
  {children(value)}
  </>;
};

// You could argue that wrapping the below components make it render faster. The counter
// is loaded first up while the data for suspended components is being fetched. This still throws
// hydration error, as the ssr'ed html doesn't match the client rendered html since, the data hungry 
// components are suspended and load fallback (due to suspense) along with the counter  which is rendered 
// quickly as it has no data dependency.

// Take away and a positive is, we can fetch data for components individually,
// render them as they come rather than all at the same time, hence render as
// you fetch.

const Contact = () => {
  return (
    <>
      <h1>Contact Us page</h1>
      <div>
        <h3>This counter should be rendered no problem</h3>
        <span>Click this counter &nbsp;</span>
        <Counter />
      </div>
      <ServerProvider>
        <Suspense fallback={<Loader className="loading-suspended">Loading poke data...</Loader>}>
          <Consumer id='poke' fetcher={fetchPokemonWithWrapper('23')}>
            {(poke) => {
              //  console.log('poke is.....', poke)
              return (
                <>
                  <PokemonCard data={poke || {}} />
                </>
              );
            }}
          </Consumer>
        </Suspense>
        <Suspense fallback={<Loader>Loading koke data...</Loader>}>
          <Consumer id='koke' fetcher={fetchPokemonWithWrapper('4')}>
            {(koke) => {
              //  console.log('poke is.....', koke)

              return (
                <>
                  <PokemonCard data={koke || {}} />
                </>
              );
            }}
          </Consumer>
        </Suspense>
      </ServerProvider>
      <Link to="/">Back</Link>
    </>
  );
};

export default Contact;

const Loader = styled.p`
  margin: auto;
`
