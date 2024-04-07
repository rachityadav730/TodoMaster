import "./styles/app.scss";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/AppContextProvider.js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./services/store";
import AllRoutes from "./components/AllRoutes";
import TaskList from "./components/TaskList.js";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <AppContextProvider>
        <BrowserRouter>
          <ChakraProvider>
            <Header />
            <AllRoutes />
              {/* <div className="container">
          <TaskList />
        </div> */}
            <Toaster />
          </ChakraProvider>
        </BrowserRouter>
      </AppContextProvider>
      </Provider>
    </div>
  );
}

export default App;
