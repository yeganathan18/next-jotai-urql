import { useAtom } from "jotai";
import { atomsWithQuery } from "jotai-urql";
import { useEffect } from "react";
import Link from "next/link";

const LANGUAGES_QUERY = `
    query Languages {
        languages {
            code
            name
        }
    }
`;

const [queryAtom, statusAtom] = atomsWithQuery(
  LANGUAGES_QUERY,
  () => ({}),
  // To learn more about getContext, check out the urql docs.
  undefined
  // no need to pass the client,
  // it's already in the wrapped with rootProvider
  // () => client
);

const DemoTwo = () => {
  const [result] = useAtom(queryAtom);

  // It's the expected behavior with jotai-urql,
  // the console log shows up twice without useEffect
  // will be improved in the Jotai v2 api

  useEffect(() => {
    console.log("languages data", result);
  });

  const languages = result?.languages?.slice(0, 10);
  return (
    <div>
      <h1>Jotai + urql Demo 1</h1>
      <h3>graphql query without variable</h3>
      <ul>
        {languages?.map((language) => (
          <li key={language.code}>
            <p>Name: {language.name}</p>
            <p>Code: {language.code}</p>
          </li>
        ))}
      </ul>
      <h2><Link href="/">Go Back Home</Link></h2>
    </div>
  );
};

export default DemoTwo;

// if we want query to be executed on the server side, uncomment this code.
// export async function getStaticProps() {
//   await client.query(LanguagesQuery, { }).toPromise();
//   return { props: { urqlState: ssrCache.extractData() }, revalidate: 60 };
// }
