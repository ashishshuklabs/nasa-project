import usePlanets from "../../api/hooks/usePlanet";

export const HomePage = () => {
  const { error, planets, loading } = usePlanets();
  console.log(planets);
  const getPlanets = () => {
    return <li>{planets && JSON.stringify(planets)}</li>;
  };
  return (
    <div>
      <h1>HomePage</h1>
      {loading && <div>Loading....</div>}
      {!loading && `Loaded ${planets?.length} planets in total`}
      {!loading && <ul>{getPlanets()}</ul>}
    </div>
  );
};
