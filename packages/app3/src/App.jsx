import LocalButton from "./Widget";
import React from "react";
import { SharedContextProvider } from "@packages/shared-library";

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App 3</h2>
    <SharedContextProvider value="Billy">
      <LocalButton sys="app3" />
    </SharedContextProvider>
  </div>
);

export default App;
