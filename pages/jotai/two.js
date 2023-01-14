import { useAtom } from "jotai";
import { atomsWithQuery } from "jotai-urql";
import Link from "next/link";
import { Suspense } from "react";

const LANGUAGE_QUERY = `
    query Language($code: ID!) {
        language(code: $code) {
            code
            name
            rtl
        }
    }
`;

const [queryAtom, statusAtom] = atomsWithQuery(
  LANGUAGE_QUERY,
  () => ({ code: "en" }),
  // To learn more about getContext, check out the urql docs.
  undefined
  // no need to pass the client,
  // it's already in the wrapped with rootProvider
  // () => client
);

const DemoThree = () => {
  const [result] = useAtom(queryAtom);

  console.log("statusAtom", result);

  return (
    <Suspense>
      <div>
        <h1>Jotai + urql Demo 2</h1>
        <h3>graphql query with variable</h3>
        <p>Code: {result?.language?.code}</p>
        <p>Name: {result?.language?.name}</p>
      </div>
      <h2>
        <Link href="/">Go Back Home</Link>
      </h2>
    </Suspense>
  );
};

export default DemoThree;

// export async function getStaticProps() {
//   await client.query(LanguageQuery, { code: "en" }).toPromise();
//   return { props: { urqlState: ssrCache.extractData() }, revalidate: 60 };
// }
