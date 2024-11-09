import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import journalsReducer from "./store/journal-store/journal-slice";
import userReducer from "./store/user-store/userSlice";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const store = configureStore({
  reducer: {
    journals: journalsReducer,
    user: userReducer,
  },
});
const themeStyling = {
 
};
const theme = extendTheme({
  components:{
    Button:{
      baseStyle:{
        fontSize:"medium"
      },
      variants:{
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'teal.600' : 'cyan.800',
          color:  props.colorMode ==="dark" ?'#1818#18dd' :"#fff",
        }),
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
