import "./styles/app.scss";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/AppContextProvider.js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./services/store";
import AllRoutes from "./components/AllRoutes";
import { Toaster } from 'react-hot-toast';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  // const theme = createTheme();
  return (
    <div className="App">
      <Provider store={store}>
      <AppContextProvider>
        <BrowserRouter>
          <ChakraProvider>
          {/* <ThemeProvider theme={theme}> */}
            <Header />
            <AllRoutes />
            <Toaster />
            {/* </ThemeProvider> */}
          </ChakraProvider>
        </BrowserRouter>
      </AppContextProvider>
      </Provider>
    </div>
  );
}

export default App;
