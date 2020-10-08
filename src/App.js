import React from "react";

import StoreProvider from "./store/StoreProvider";
import "./App.scss";

const App = () => {
  return (
    <StoreProvider>
      <header></header>
    </StoreProvider>
  );
};

export default App;
