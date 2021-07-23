import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Game } from "./Game";
import { Provider } from "react-redux";
import { store } from "./store/store";

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
