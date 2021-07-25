import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Game } from "./Game";
import { Provider } from "react-redux";
import { store, persistor } from "./store/config_store";
import { PersistGate } from "redux-persist/integration/react";

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Game />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
