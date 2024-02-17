import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "./config/theme";
import SideNavDrawer from "./components/SideNavDrawer";
import AppRoutes from "./config/routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ flexGrow: 1, padding: '85px 20px 64px 85px' }}>
        <SideNavDrawer />
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;
