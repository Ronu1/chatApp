import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "../src/redux/app/store.js";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { ChatContextProvider } from "./Context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
  <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChatContextProvider>
  </AuthContextProvider>
    </Provider>
);
