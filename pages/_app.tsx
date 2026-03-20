import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '@xyflow/react/dist/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
