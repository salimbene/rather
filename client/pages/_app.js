import "../styles/styles.css";

import Script from "next/script";
import Head from "next/head";

import { FavsProvider } from "../contexts/favs";
import { AuthProvider } from "../contexts/auth";

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavsProvider>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
        </Head>
        <Script
          id="bootstrap-cdn"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        />
        <Component {...pageProps} />
      </FavsProvider>
    </AuthProvider>
  );
}
