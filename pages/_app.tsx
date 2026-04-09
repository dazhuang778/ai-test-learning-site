import type { AppProps } from 'next/app';
import { ThemeProvider } from '../lib/theme-context';
import '../styles/globals.css';
import '@xyflow/react/dist/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
