import { useQuery } from "urql";

const LanguageQuery = `
    query LanguageQuery($code: ID!) {
        language(code: $code) {
            code
            name
            rtl
        }
    }
`;

const QueryWithVar = () => {
  const [result] = useQuery({
    query: LanguageQuery,
    variables: { code: "en" },
  });
  const { data, loading, error } = result;

  if (result.fetching) return <div>Loading</div>;
  if (result.error) return <div>Error</div>;

  console.log("query language data", result.fetching ? "loading" : result.data);

  return (
    <div>
      <h1>Query With Variable</h1>
      <p>{result?.data?.language?.name}</p>
    </div>
  );
}

export default QueryWithVar;


// export async function getStaticProps() {
//   await client.query(LanguageQuery, { code: "en" }).toPromise();
//   return { props: { urqlState: ssrCache.extractData() }, revalidate: 60 };
// }
