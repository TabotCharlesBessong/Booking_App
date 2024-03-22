// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor} >
      <Provider store={store} >
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
