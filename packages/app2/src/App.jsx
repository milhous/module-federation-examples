import LocalButton from "./Widget";
import React from "react";
import { SharedContextProvider } from "../../shared-library/src";

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App 2</h2>
    <SharedContextProvider value="Mike">
      <LocalButton sys="app2" />
    </SharedContextProvider>
  </div>
);

export default App;