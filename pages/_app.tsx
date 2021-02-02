import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import "../styles/globals.css";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ToastProvider autoDismissTimeout={2000} placement={"top-left"}>
        <Component {...pageProps} />
      </ToastProvider>
    </ApolloProvider>
  );
}

export default MyApp;
