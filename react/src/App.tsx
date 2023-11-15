import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DefaultLayout from "./components/DefaultLayout.tsx";
import theme from "./theme.ts";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultLayout />
    </ThemeProvider>
  );
}
