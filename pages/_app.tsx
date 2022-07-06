import "@src/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import Layout from "@src/components/global/Layout";
import { AppContextWrapper } from "@src/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextWrapper>
    </SessionProvider>
  );
}

export default MyApp;
