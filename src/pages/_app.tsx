import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ColorScheme } from "@mantine/core"
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { api } from "../utils/api";
import "../styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <SessionProvider session={session}>
            <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme,
                    primaryColor: 'yellow',
                    fontFamily:
                      'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                    headings: {
                      fontFamily:
                        'Lora, ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
                    },
                  }}
            >
                <Component {...pageProps} />
            </MantineProvider>
            </ColorSchemeProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
