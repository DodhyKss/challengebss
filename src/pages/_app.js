import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Login from "./login";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

export default function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("baserow_token");
    if (savedToken) setToken(savedToken);
  }, []);

  return token ? <Component {...pageProps} /> : <Login onLogin={setToken} />;
}

