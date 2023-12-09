import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
// import { Provider as ReduxProvider } from "react-redux";
// import { RTL } from "../components/rtl";
import { SettingsButton } from "../components/settings-button";
import { SplashScreen } from "../components/splash-screen";
import { AuthConsumer, AuthProvider } from "../contexts/jwt-context";
import { SettingsConsumer, SettingsProvider } from "../contexts/settings-context";
import "../i18n";
// import { store } from "../store";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App: NextPage<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* <ReduxProvider store={store}> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider
                  theme={createTheme({
                    direction: settings.direction,
                    responsiveFontSizes: settings.responsiveFontSizes,
                    mode: settings.theme,
                  })}
                >
                  <CssBaseline />
                  <Toaster position="top-center" />
                  <SettingsButton />
                  <AuthConsumer>
                    {(auth) =>
                      !auth.isInitialized ? (
                        <SplashScreen />
                      ) : (
                        <QueryClientProvider client={queryClient}>
                          {getLayout(<Component {...pageProps} />)}
                        </QueryClientProvider>
                      )
                    }
                  </AuthConsumer>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </LocalizationProvider>
      {/* </ReduxProvider> */}
    </CacheProvider>
  );
};

export default App;
