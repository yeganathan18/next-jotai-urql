import { Suspense } from "react";
import { Provider as GraphqlProvider } from "urql";
import { Provider } from "jotai";
import { clientAtom } from "jotai-urql";
import { client, ssrCache } from "../lib/urqlClient";

export default function MyApp({ Component, pageProps }) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <GraphqlProvider value={client}>
      <Provider initialValues={[[clientAtom, client]]}>
        <Suspense fallback="Loading...">
          <Component {...pageProps} />
        </Suspense>
      </Provider>
    </GraphqlProvider>
  );
}
