// 참고한 페이지들
// https://www.apollographql.com/blog/building-a-next-js-app-with-apollo-client-slash-graphql/
// https://stackoverflow.com/questions/63054130/the-best-way-to-pass-authorization-header-in-nextjs-using-apollo-client-referen

import { useMemo } from "react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient;

function createApolloClient() {
  let token;

  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URL,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    if (typeof window !== "undefined") {
      token = localStorage.getItem("jwt");
    }
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
