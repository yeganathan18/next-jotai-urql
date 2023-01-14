import React from "react";
import { useQuery } from "urql";
import Link from "next/link";

const countriesQuery = `
  query allCountries {
    countries {
      name
      emoji
      code
    }
  }
`;

function DemoOne() {
  const [result] = useQuery({
    query: countriesQuery,
  });

  if (result.fetching) {
    return "Loading...";
  } else if (result.error) {
    return "There was an error :(";
  }

  console.log("countries data", result.data);

  const data = result?.data?.countries?.slice(0, 10);

  return (
    <div style={{ paddingLeft: "2rem" }}>
      <h1>Demo 1</h1>
      <h3>urql graphql query without atoms</h3>
      <div>
        {result &&
          result.data &&
          data?.map(({ name, emoji }) => (
            <li
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 16,
                fontFamily: "sans-serif",
                marginBottom: 10,
              }}
            >
              {name}
              <span> {emoji}</span>
            </li>
          ))}
      </div>
      <h2>
        <Link href="/">Go Back Home</Link>
      </h2>
    </div>
  );
}

export default DemoOne;
