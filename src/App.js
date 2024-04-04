import "./styles/app.scss";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/AppContextProvider.js";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <BrowserRouter>
          <ChakraProvider>
            <Header />
          </ChakraProvider>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
