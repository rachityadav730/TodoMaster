import "./styles/app.scss";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./components/AppContextProvider.js";
import TaskList from "./components/TaskList";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./services/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <AppContextProvider>
        <BrowserRouter>
          <ChakraProvider>
            <Header />
              <div className="container">
                <TaskList />
              </div>
          </ChakraProvider>
        </BrowserRouter>
      </AppContextProvider>
      </Provider>
    </div>
  );
}

export default App;
