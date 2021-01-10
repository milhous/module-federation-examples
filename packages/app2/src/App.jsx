import LocalButton from "./Widget";
import React from "react";
import { NameContextProvider } from "../../shared-library/src";

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App 2</h2>
    <NameContextProvider.Provider value="Mike">
      <LocalButton sys="app2" />
    </NameContextProvider.Provider>
  </div>
);

export default App;