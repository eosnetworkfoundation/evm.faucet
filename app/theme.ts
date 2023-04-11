// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: "rgb(18,22,22)",
        backgroundImage: `url('/bg.jpg')`,
        height: '100%',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: 'white',
      },
    }),
  },
  fonts: {
    body: `Rajdhani, sans-serif`,
  },
});

export default theme;
