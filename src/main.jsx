import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { StoreProvider } from "./context/AuthContext";

// if (proccess.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StoreProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </StoreProvider>
  </Provider>
);
