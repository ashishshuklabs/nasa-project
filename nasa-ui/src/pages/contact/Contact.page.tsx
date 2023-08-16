import React, { ReactNode, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../../components/card/PokemonCard.component";
import { ServerProvider, useServerData } from "../../api/context/serverContext";
import { fetchPokemonWithWrapper } from "../../api/requests/pokemon";
import { Pokemon } from "src/api/types";

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
  console.log('env: Server:', typeof window === 'undefined', 'loader script:', loaderScript, 'value is..', value)
  return <>
  {loaderScript}
  {children(value)}
  </>;
};

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
        <Suspense fallback={<p>Loading contact data...</p>}>
          <Consumer id='poke' fetcher={fetchPokemonWithWrapper('23')}>
            {(poke) => {
               console.log('poke is.....', poke)
              return (
                <>
                  <PokemonCard data={poke || {}} />
                </>
              );
            }}
          </Consumer>
        </Suspense>
        <Suspense fallback={<p>Loading contact data...</p>}>
          <Consumer id='koke' fetcher={fetchPokemonWithWrapper('4')}>
            {(koke) => {
               console.log('poke is.....', koke)

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
