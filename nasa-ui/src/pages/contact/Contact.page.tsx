import React, { ReactNode, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../../components/card/PokemonCard.component";
import { ServerProvider, useServerData } from "../../api/context/serverContext";

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
  children: (data: any) => ReactNode;
}> = ({ id, children }) => {
  const {loaderScript, value} = useServerData(id);
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
          <Consumer id='23'>
            {(poke) => {
              console.log("Is this poke???", poke);
              return (
                <>
                  <PokemonCard data={poke || {}} />
                </>
              );
            }}
          </Consumer>
        </Suspense>
      </ServerProvider>
      <ServerProvider>
        <Suspense fallback={<p>Loading contact data...</p>}>
          <Consumer id='99'>
            {(koke) => {
              console.log("Is this koke???", koke);
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
