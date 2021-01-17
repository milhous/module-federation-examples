import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { SharedContextProvider } from "../../shared-library/src";
import Navigation from "./Navigation";

const remoteApps = {
  app2: ['http://localhost:3002/', location.origin + '/app2/'],
  app3: ['http://localhost:3003/', location.origin + '/app3/']
}

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();

    return Module;
  };
}

function loadRoutes(props) {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });
  let routes = [];

  if (!props.system) {
    return routes;
  }

  if (!ready) {
    return routes;
  }

  if (failed) {
    return routes;
  }

  routes = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return routes;
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function System(props) {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <React.Suspense fallback="Loading System">
        <Component sys='app1' name={props.name} />
      </React.Suspense>
  );
}

function App() {
  const [system, setSystem] = React.useState({});
  const [name, setName] = React.useState('');
  const [routes, setRoutes] = React.useState([]);
  const isLocal = location.hostname === 'localhost';

  React.useEffect(() => {
    // const url = isLocal ? remoteApps.app2[0] : remoteApps.app2[1];
    // const remoteRoutes = loadRoutes({
    //   url: url + "remoteEntry.js",
    //   scope: "app2",
    //   module: "./routes",
    // });

    // console.log(remoteRoutes);
  }, []);

  function setApp2() {
    const url = isLocal ? remoteApps.app2[0] : remoteApps.app2[1];

    setSystem({
      url: url + "remoteEntry.js",
      scope: "app2",
      module: "./Widget",
    });
  }

  function setApp3() {
    const url = isLocal ? remoteApps.app3[0] : remoteApps.app3[1];

    setSystem({
      url: url + "remoteEntry.js",
      scope: "app3",
      module: "./Widget",
    });
  }

  return (
    <HashRouter>
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        <h1>Dynamic System Host</h1>
        <h2>App 1</h2>
        <p>
          The Dynamic System will take advantage Module Federation{" "}
          <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
        <button onClick={setApp3}>Load App 3 Widget</button>
        <button onClick={setApp2}>Load App 2 Widget</button>
        <button onClick={() => { setName('' + Math.random()) }}>setName: {name}</button>
        <div style={{ marginTop: "2em" }}>
          <SharedContextProvider value="Milhous">
            <System system={system} name={name} />
            </SharedContextProvider>
        </div>
        <Navigation />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Switch>
        </React.Suspense>
      </div>
    </HashRouter>
  );
}

export default App;
