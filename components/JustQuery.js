import { useQuery } from "urql";

const LanguagesQuery = `
    query LanguagesQuery {
        languages {
            code
            name
        }
    }
`;

const JustQuery = () => {
  const [result] = useQuery({
    query: LanguagesQuery,
    // variables: {},
  });

  // const { data, loading, error } = result;

  if (result.fetching) return <div>Loading</div>;
  if (result.error) return <div>Error</div>;

  console.log("languages data", result.fetching ? "loading" : result.data);

  return (
    <div>
      <h1>Just Query</h1>
      {result.data?.languages?.map((language) => (
        <div key={language?.code}>
          <p>{language?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default JustQuery;

// if we want out query to be executed on the server side, we need to do this:
// export async function getStaticProps() {
//   await client.query(LanguagesQuery, { }).toPromise();
//   return { props: { urqlState: ssrCache.extractData() }, revalidate: 60 };
// }
