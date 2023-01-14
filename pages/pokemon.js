import { useAtom } from "jotai";
import { atomsWithQuery } from "jotai-urql";
import { createClient, gql } from "@urql/core";
import { useEffect } from "react";

// const client = createClient({
//   url: "https://trygql.formidable.dev/graphql/basic-pokedex",
// });

const POKEMONS_QUERY = gql`
  query Pokemons {
    pokemons(limit: 10) {
      id
      name
    }
  }
`;

const [queryAtom, statusAtom] = atomsWithQuery(
  POKEMONS_QUERY,
  () => ({}),
  undefined,
);

const Main = () => {
  // we can use the statusAtom to get the result of the query as well as the status of the query
  //   const [result] = useAtom(statusAtom);
  //   const pokemons = result?.data?.pokemons;

  const [result] = useAtom(queryAtom);

  useEffect(
    () => {
      console.log("result", result);
    }
  )

  return (
    <div>
      <h2>Pokemons</h2>
      {result?.pokemons?.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default Main;
